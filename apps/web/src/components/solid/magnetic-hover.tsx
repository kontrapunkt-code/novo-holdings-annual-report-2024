import { animate, frame, hover, press } from "motion";
import type { ParentComponent, Signal } from "solid-js";
import { createSignal, onCleanup, onMount } from "solid-js";

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
	element: HTMLElement,
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

	const cancelHover = hover(element, () => {
		if (element.dataset.paused) return;

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

		let isHovering = true;

		const { left, top, width, height } = element.getBoundingClientRect();

		const halfWidth = width / 2;
		const halfHeight = height / 2;

		const pointerMove = ({ clientX, clientY }: MouseEvent) => {
			if (!isHovering || element.dataset.paused) {
				animate(
					element,
					{
						x: 0,
						y: 0,
						rotate: 0,
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

				return;
			}

			frame.postRender(() => {
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
			isHovering = false;

			document.removeEventListener("pointermove", pointerMove);

			frame.postRender(() => {
				animate(
					element,
					{
						x: 0,
						y: 0,
						rotate: 0,
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
			});
		};
	});

	onCleanup(() => {
		cancelHover();
	});
};

interface Props extends Partial<typeof defaultOptions> {
	class?: string;
	refSignal?: Signal<HTMLDivElement | undefined>;
}

export const MagneticHover: ParentComponent<Props> = (props) => {
	const [elementRef, setElementRef] = createSignal<
		HTMLDivElement | undefined
	>();

	onMount(() => {
		const element = props.refSignal?.[0]() ?? elementRef();
		if (!element) return;

		createMagneticHover(element, props);
	});

	return (
		<div
			class={props.class}
			tabIndex={-1}
			ref={props.refSignal?.[1] ?? setElementRef}
		>
			{props.children}
		</div>
	);
};
