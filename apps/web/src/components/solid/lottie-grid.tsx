import { createMagneticHover } from "@/components/solid/magnetic-hover";
import { vh, vw } from "@/scripts/helpers";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import { createMediaQuery } from "@solid-primitives/media";
import type Lenis from "lenis";
import { animate, stagger } from "motion";
import { For, type VoidComponent, createSignal, onMount } from "solid-js";

export interface Props {
	animations: {
		src: string;
		aspectRatio: string;
	}[];
}

export const LottieGrid: VoidComponent<Props> = (props) => {
	let grid: HTMLDivElement | undefined;
	let overlay: HTMLDivElement | undefined;

	const [activeButton, setActiveButton] = createSignal<HTMLButtonElement>();
	const [targets, setTargets] = createSignal<Element[]>([]);
	const isDesktop = createMediaQuery("(width >= 48rem)");

	createIntersectionObserver(targets, async (entries) => {
		if (isDesktop()) return;

		const { default: LottieWeb } = await import("@lottielab/lottie-player/web");

		for (const entry of entries) {
			const fromBottom = entry.boundingClientRect.y > 0;
			const isEntering = fromBottom && entry.isIntersecting;

			if (isEntering) {
				const lottie = entry.target.querySelector("lottie-player");
				if (lottie instanceof LottieWeb) {
					lottie.seek(0);
					lottie.pause();

					setTimeout(() => {
						lottie.play();
					}, 300);

					animate(
						entry.target,
						{
							opacity: [0, 1],
							y: ["2rem", "0rem"],
							filter: ["blur(0.25rem)", "blur(0rem)"],
						},
						{
							type: "spring",
							visualDuration: 0.6,
							bounce: 0.3,
						},
					);
				}
			}
		}
	});

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
			lottie.loop = false;
			wrapper.append(lottie);

			Promise.all([
				new Promise((resolve) => lottie.addEventListener("load", resolve)),
				new Promise((resolve) => setTimeout(resolve, delay)),
			]).then(() => {
				createMagneticHover(wrapper, {
					moveStrength: {
						x: 10,
						y: 10,
					},
					rotationStrength: 0.05,
					hoverActiveScale: 1.05,
					hoverIdleScale: 1,
					zIndex: 1,
					pressable: true,
				});

				lottie.seek(0);
				lottie.pause();

				setTimeout(() => {
					lottie.play();
				}, 100);

				animate(
					wrapper,
					{
						opacity: [0, 1],
						y: ["2rem", "0rem"],
						filter: ["blur(0.25rem)", "blur(0rem)"],
					},
					{
						type: "spring",
						visualDuration: 0.6,
						bounce: 0.3,
					},
				);
			});
		}
	});

	const handleClick = async (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement | null;
		if (!button || !overlay || activeButton()) return;

		setActiveButton(button);

		const { width, height, x, y } = button.getBoundingClientRect();
		const padding = 64;
		const maxWidth = vw() - padding * 2;
		const maxHeight = vh() - padding * 2;

		const widthRatio = maxWidth / width;
		const heightRatio = maxHeight / height;
		const scale = Math.min(widthRatio, heightRatio);

		const targetX = vw() * 0.5 - x - width * 0.5;
		const targetY = vh() * 0.5 - y - height * 0.5;

		animate(
			".lottie-button",
			{
				zIndex: 0,
			},
			{
				duration: 0,
			},
		);

		animate(
			overlay,
			{
				opacity: 1,
				pointerEvents: "auto",
			},
			{
				type: "spring",
				visualDuration: 0.3,
				bounce: 0.17,
			},
		);

		await new Promise((resolve) => setTimeout(resolve, 0));

		const lottieWrapper = button.querySelector(".lottie-wrapper");
		if (lottieWrapper instanceof HTMLElement) {
			lottieWrapper.dataset.paused = "true";

			animate(
				lottieWrapper,
				{
					x: 0,
					y: 0,
					rotate: 0,
					scale: 1,
					zIndex: 0,
					opacity: 1,
				},
				{
					type: "spring",
					visualDuration: 0.3,
					bounce: 0.17,
				},
			);
		}

		animate(
			button,
			{
				scale,
				x: targetX,
				y: targetY,
				zIndex: 102,
			},
			{
				type: "spring",
				visualDuration: 0.3,
				bounce: 0.17,
			},
		);

		window.addEventListener("click", handleClose);
		window.addEventListener("keydown", handleClose);

		const { lenis } = await import("@/scripts/lenis");
		lenis.on("scroll", handleClose);

		const { default: LottieWeb } = await import("@lottielab/lottie-player/web");
		const lottie = button.querySelector("lottie-player");
		if (lottie instanceof LottieWeb) {
			lottie.seek(0);
			lottie.play();
		}
	};

	const handleClose = async (event: MouseEvent | KeyboardEvent | Lenis) => {
		if (event instanceof KeyboardEvent && event.key !== "Escape") return;

		window.removeEventListener("click", handleClose);
		window.removeEventListener("keydown", handleClose);

		const { lenis } = await import("@/scripts/lenis");
		lenis.off("scroll", handleClose);

		const button = activeButton();
		setActiveButton(undefined);

		if (!button || !overlay) return;

		animate(
			overlay,
			{
				opacity: 0,
				pointerEvents: "none",
			},
			{
				type: "spring",
				visualDuration: 0.3,
				bounce: 0.17,
			},
		);

		const lottie = button.querySelector(".lottie-wrapper");
		if (lottie instanceof HTMLElement) {
			lottie.removeAttribute("data-paused");

			animate(
				lottie,
				{
					x: 0,
					y: 0,
					rotate: 0,
					scale: 1,
					zIndex: 0,
					opacity: 1,
				},
				{
					type: "spring",
					visualDuration: 0.3,
					bounce: 0.17,
				},
			);
		}

		animate(
			button,
			{
				scale: 1,
				x: 0,
				y: 0,
			},
			{
				type: "spring",
				visualDuration: 0.3,
				bounce: 0.17,
			},
		);
	};

	return (
		<div class="group gap-4 md:columns-3" ref={grid}>
			<For each={props.animations}>
				{(animation) => (
					<button
						type="button"
						onClick={handleClick}
						class="lottie-button pointer-events-none relative mb-4 w-full cursor-pointer md:pointer-events-auto"
						style={{ "aspect-ratio": animation.aspectRatio }}
					>
						<div
							class="lottie-wrapper relative z-0 w-full overflow-hidden rounded-lg opacity-0 backdrop-blur-sm"
							data-src={animation.src}
							tabIndex={-1}
							ref={(next) => setTargets((existing) => [...existing, next])}
						/>
					</button>
				)}
			</For>
			<div
				class="pointer-events-none fixed inset-0 z-101 bg-white/80 opacity-0"
				ref={overlay}
			/>
		</div>
	);
};
