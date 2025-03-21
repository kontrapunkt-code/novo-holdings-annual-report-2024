import { animate, frame, hover, press } from "motion";
import type { ParentComponent } from "solid-js";
import { onMount } from "solid-js";

/**
 * The default options for the magnetic hover.
 */
export const defaultOptions = {
	/**
	 * The strength of the magnetic hover.
	 * @default { x: 10, y: 10 }
	 */
	moveStrength: {
		x: 10,
		y: 10,
	},
	/**
	 * Whether the element is pressable.
	 * @default false
	 */
	pressable: false,
	/**
	 * The strength of the rotation.
	 * @default 0.05
	 */
	rotationStrength: 0.05,
	/**
	 * The options for the hover.
	 * @default 1.1
	 */
	hoverActiveScale: 1.1,
	/**
	 * The scale of the hover when idle.
	 * @default 1
	 */
	hoverIdleScale: 1,
	/**
	 * The opacity of the hover when idle.
	 * @default 1
	 */
	hoverOpacity: 1,
	/**
	 * The options for the press.
	 * @default 0.98
	 */
	pressActiveScale: 0.98,
	/**
	 * The scale of the press when idle.
	 * @default 1
	 */
	pressIdleScale: 1,
	/**
	 * The opacity of the press when idle.
	 * @default 1
	 */
	pressOpacity: 1,
	/**
	 * The z-index of the element.
	 * @default 0
	 */
	zIndex: 0,
};

/**
 * Creates a magnetic hover effect on an element.
 * @param element - The element to create the magnetic hover effect on.
 * @param options - The options for the magnetic hover effect.
 * @returns A function to remove the magnetic hover effect.
 */
export const createMagneticHover = (
	element: Element,
	options?: Partial<typeof defaultOptions>,
) => {
	const {
		moveStrength,
		pressable,
		rotationStrength,
		hoverActiveScale,
		hoverIdleScale,
		hoverOpacity,
		pressActiveScale,
		pressIdleScale,
		pressOpacity,
		zIndex,
	} = {
		...defaultOptions,
		...options,
	};

	if (pressable) {
		press(element, () => {
			animate(
				element,
				{
					scale: pressActiveScale,
					opacity: pressOpacity,
				},
				{
					type: "spring",
					visualDuration: 0.1,
					bounce: 0.1,
				},
			);

			return () => {
				animate(
					element,
					{
						scale: pressIdleScale,
						opacity: 1,
					},
					{
						type: "spring",
						visualDuration: 0.2,
						bounce: 0.1,
					},
				);
			};
		});
	}

	hover(element, () => {
		animate(
			element,
			{
				scale: hoverActiveScale,
				zIndex,
				opacity: pressable ? hoverOpacity : 1,
			},
			{
				type: "spring",
				visualDuration: 0.4,
				bounce: 0.1,
			},
		);

		const { left, top, width, height } = element.getBoundingClientRect();

		const halfWidth = width / 2;
		const halfHeight = height / 2;

		let isHovering = true;

		const pointerMove = ({ clientX, clientY }: MouseEvent) => {
			frame.postRender(() => {
				if (!isHovering) return;

				const x = ((clientX - left - halfWidth) / halfWidth) * moveStrength.x;
				const y = ((clientY - top - halfHeight) / halfHeight) * moveStrength.y;

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
			animate(
				element,
				{
					scale: hoverIdleScale,
					zIndex: 0,
					opacity: 1,
				},
				{
					type: "spring",
					visualDuration: 0.3,
					bounce: 0.1,
				},
			);

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

interface Props extends Partial<typeof defaultOptions> {
	class?: string;
}

export const MagneticHover: ParentComponent<Props> = (props) => {
	let element: HTMLDivElement | undefined;

	onMount(() => {
		if (!element) return;

		createMagneticHover(element, props);
	});

	return (
		<div ref={element} class={props.class}>
			{props.children}
		</div>
	);
};
