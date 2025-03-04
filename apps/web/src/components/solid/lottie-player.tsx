import type { LottieWeb } from "@lottielab/lottie-player";
import { type VoidComponent, onMount } from "solid-js";

interface Props {
	/**
	 * The source of the lottie animation.
	 */
	src: string;
	/**
	 * The delay in milliseconds before the lottie animation starts.
	 */
	delay?: number;
}

export const LottiePlayer: VoidComponent<Props> = (props) => {
	let lottie: LottieWeb | undefined;

	onMount(async () => {
		if (!lottie) return;

		await import("@lottielab/lottie-player/web");

		lottie.setAttribute("src", props.src);
		await new Promise((resolve) => lottie.addEventListener("load", resolve));

		lottie.loop = false;
		lottie.pause();

		if (props.delay) {
			await new Promise((resolve) => setTimeout(resolve, props.delay));
		}

		lottie.play();
	});

	return <lottie-player class="h-full w-full" ref={lottie} />;
};
