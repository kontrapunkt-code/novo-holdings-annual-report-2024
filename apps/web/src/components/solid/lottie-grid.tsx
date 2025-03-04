import { EASE_IN_OUT_QUART } from "@/scripts/ease";
import { animate, stagger } from "motion";
import { For, type VoidComponent, onMount } from "solid-js";

export interface Props {
	animations: {
		src: string;
		aspectRatio: string;
	}[];
}

export const LottieGrid: VoidComponent<Props> = (props) => {
	let grid: HTMLDivElement | undefined;

	onMount(async () => {
		if (!grid) return;

		const { default: LottieWeb } = await import("@lottielab/lottie-player/web");

		const wrappers: NodeListOf<HTMLDivElement> =
			grid.querySelectorAll(".lottie-wrapper");

		for (const wrapper of wrappers) {
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

	return (
		<div
			class="at-a-glance-grid columns-3 gap-4 *:mb-4 *:w-full *:overflow-hidden *:rounded-lg *:opacity-0"
			ref={grid}
		>
			<For each={props.animations}>
				{(animation) => (
					<div
						class="lottie-wrapper"
						style={`aspect-ratio: ${animation.aspectRatio}`}
						data-src={animation.src}
					/>
				)}
			</For>
		</div>
	);
};
