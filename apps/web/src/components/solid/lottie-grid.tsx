import { EASE_IN_OUT_QUART } from "@/scripts/ease";
import { animate, frame, hover, stagger } from "motion";
import { For, type VoidComponent, createSignal, onMount } from "solid-js";

export interface Props {
	animations: {
		src: string;
		aspectRatio: string;
	}[];
}

export const LottieGrid: VoidComponent<Props> = (props) => {
	let grid: HTMLDivElement | undefined;

	const [mouse, setMouse] = createSignal<[number, number]>([0, 0]);

	onMount(async () => {
		window.addEventListener("mousemove", (event) => {
			setMouse([event.clientX, event.clientY]);
		});

		if (!grid) return;

		const { default: LottieWeb } = await import("@lottielab/lottie-player/web");

		const wrappers: NodeListOf<HTMLDivElement> =
			grid.querySelectorAll(".lottie-wrapper");

		for (const wrapper of wrappers) {
			hover(wrapper, onHover);

			const lottie = new LottieWeb();
			const src = wrapper.getAttribute("data-src") ?? "";
			const index = Array.from(wrappers).indexOf(wrapper);
			const staggerer = stagger(0.2);
			const delay = staggerer(index, wrappers.length) * 1000;

			lottie.setAttribute("src", src);
			lottie.classList.add("w-full", "h-full");
			wrapper.append(lottie);

			Promise.all([
				new Promise((resolve) => lottie.addEventListener("load", resolve)),
				new Promise((resolve) => setTimeout(resolve, delay)),
			]).then(() => {
				lottie.loop = false;
				lottie.seek(0);
				lottie.pause();

				setTimeout(() => {
					lottie.play();
				}, 300);

				animate(
					wrapper,
					{
						opacity: 1,
						y: ["2rem", "0rem"],
						filter: ["blur(0.25rem)", "blur(0px)"],
					},
					{
						duration: 0.8,
						ease: EASE_IN_OUT_QUART,
					},
				);
			});
		}
	});

	const onHover = (element: Element) => {
		const { left, top, width, height } = element.getBoundingClientRect();

		const halfWidth = width / 2;
		const halfHeight = height / 2;
		const centerX = left + halfWidth;
		const centerY = top + halfHeight;

		let isHovering = true;

		const magneticStrength = 15;
		const magneticRotation = 0.05;

		const pointerMove = () => {
			frame.postRender(() => {
				if (!isHovering) {
					animate(
						element,
						{
							x: 0,
							y: 0,
						},
						{
							type: "spring",
							visualDuration: 0.3,
							bounce: 0.1,
						},
					);

					return;
				}

				const [mouseX, mouseY] = mouse();
				const x = ((mouseX - centerX) / halfWidth) * magneticStrength;
				const y = ((mouseY - centerY) / halfHeight) * magneticStrength;

				animate(
					element,
					{
						x,
						y,
						rotate: (x + y) * magneticRotation,
					},
					{
						type: "spring",
						visualDuration: 0.2,
						bounce: 0,
					},
				);
			});
		};

		animate(
			element,
			{
				scale: 1.14,
				zIndex: 1,
			},
			{
				type: "spring",
				visualDuration: 0.4,
				bounce: 0.1,
			},
		);

		document.addEventListener("pointermove", pointerMove);

		return () => {
			isHovering = false;

			document.removeEventListener("pointermove", pointerMove);

			animate(
				element,
				{
					scale: 1,
					zIndex: 0,
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
	};

	return (
		<div
			class="at-a-glance-grid columns-3 gap-4 *:mb-4 *:w-full *:overflow-hidden *:rounded-lg *:opacity-0"
			ref={grid}
		>
			<For each={props.animations}>
				{(animation) => (
					<div
						class="lottie-wrapper relative z-0 rounded-lg backdrop-blur-sm"
						style={`aspect-ratio: ${animation.aspectRatio}`}
						data-src={animation.src}
					/>
				)}
			</For>
		</div>
	);
};
