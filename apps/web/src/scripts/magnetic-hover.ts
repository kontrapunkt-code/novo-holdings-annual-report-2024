import { animate, frame, hover } from "motion";

const defaultOptions = {
	moveStrength: 10,
	rotationStrength: 0.05,
};

export const createMagneticHover = (
	element: Element,
	options?: Partial<typeof defaultOptions>,
) => {
	const { moveStrength, rotationStrength } = {
		...defaultOptions,
		...options,
	};

	hover(element, () => {
		const { left, top, width, height } = element.getBoundingClientRect();

		const halfWidth = width / 2;
		const halfHeight = height / 2;

		let isHovering = true;

		const pointerMove = ({ clientX, clientY }: MouseEvent) => {
			frame.postRender(() => {
				if (!isHovering) return;

				const x = ((clientX - left - halfWidth) / halfWidth) * moveStrength;
				const y = ((clientY - top - halfHeight) / halfHeight) * moveStrength;

				animate(
					element,
					{
						x,
						y,
						rotate: (x + y) * rotationStrength,
					},
					{
						type: "spring",
						visualDuration: 0.2,
						bounce: 0,
					},
				);
			});
		};

		document.addEventListener("pointermove", pointerMove);

		return () => {
			isHovering = false;

			document.removeEventListener("pointermove", pointerMove);

			animate(
				element,
				{
					x: 0,
					y: 0,
					rotate: 0,
				},
				{
					type: "spring",
					visualDuration: 0.3,
					bounce: 0.1,
				},
			);
		};
	});
};
