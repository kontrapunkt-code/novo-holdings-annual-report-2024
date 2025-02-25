import type { LottieWeb } from "@lottielab/lottie-player";
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

		await import("@lottielab/lottie-player/web");

		const wrappers: NodeListOf<HTMLDivElement> =
			grid.querySelectorAll(".lottie-wrapper");

		for (const wrapper of wrappers) {
			const lottie: LottieWeb | null = wrapper.querySelector("lottie-player");
			if (!lottie) continue;

			const index = Array.from(wrappers).indexOf(wrapper);
			const staggerer = stagger(0.1);
			const delay = staggerer(index, wrappers.length) * 1000;

			Promise.all([
				new Promise((resolve) => lottie.addEventListener("load", resolve)),
				new Promise((resolve) => setTimeout(resolve, delay)),
			]).then(() => {
				lottie.loop = false;
				lottie.seek(0);
				lottie.play();

				animate(
					wrapper,
					{
						opacity: 1,
						y: ["2rem", "0rem"],
					},
					{
						type: "spring",
						visualDuration: 0.5,
						bounce: 0.3,
					},
				);
			});
		}
	});

	return (
		<div class="col-span-4 md:col-span-6 grid md:grid-cols-2 gap-4" ref={grid}>
			<For each={props.animations}>
				{(animation) => (
					<div
						class="lottie-wrapper w-full bg-[#B2B7CD] rounded-lg overflow-hidden opacity-0"
						style={`aspect-ratio: ${animation.aspectRatio}`}
					>
						<lottie-player class="w-full h-full" src={animation.src} />
					</div>
				)}
			</For>
		</div>
	);
};
