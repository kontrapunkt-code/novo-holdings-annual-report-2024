import { BlurShadow } from "@/components/solid/blur-shadow";
import { Icon } from "@/components/solid/icon";
import { MagneticHover } from "@/components/solid/magnetic-hover";
import { EASE_OUT_CUBIC } from "@/scripts/ease";
import { animate } from "motion";
import {
	Show,
	type VoidComponent,
	createEffect,
	createSignal,
	onCleanup,
} from "solid-js";
import { Portal } from "solid-js/web";

interface VideoPlayerProps {
	src: string;
	alt: string;
	thumbnailSrc?: string;
	thumbnailAlt?: string;
	callToAction?: string | null;
}

export const VideoPlayer: VoidComponent<VideoPlayerProps> = (
	props: VideoPlayerProps,
) => {
	let videoRef: HTMLVideoElement | undefined;
	let lightboxRef: HTMLDivElement | undefined;

	const magneticHoverSignal = createSignal<HTMLDivElement | undefined>();
	const [isOpen, setIsOpen] = createSignal(false);

	createEffect(() => {
		if (isOpen()) {
			window.addEventListener("keydown", keyDownClose);
		}

		onCleanup(() => {
			window.removeEventListener("keydown", keyDownClose);
		});
	});

	const open = async () => {
		setIsOpen(true);
		if (!videoRef || !lightboxRef) return;

		animate(
			lightboxRef,
			{ opacity: 1 },
			{ duration: 0.2, ease: EASE_OUT_CUBIC },
		);
		animate(
			videoRef,
			{ scale: [0.8, 1], opacity: 1 },
			{ duration: 0.2, ease: EASE_OUT_CUBIC, delay: 0.1 },
		);

		videoRef.focus();

		const { lenis } = await import("@/scripts/lenis");
		lenis.on("scroll", close);
	};

	const keyDownClose = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			close();
		}
	};

	const clickLightbox = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			close();
		}
	};

	const close = async () => {
		const button = magneticHoverSignal?.[0]()?.querySelector(
			"button.video-player-button",
		);
		if (button instanceof HTMLButtonElement) {
			button.focus();
		}

		if (!videoRef || !lightboxRef) return;

		const { lenis } = await import("@/scripts/lenis");
		lenis.off("scroll", close);

		animate(
			lightboxRef,
			{ opacity: 0 },
			{ duration: 0.2, ease: EASE_OUT_CUBIC },
		);
		await animate(
			videoRef,
			{ scale: 0.8, opacity: 0 },
			{ duration: 0.2, ease: EASE_OUT_CUBIC },
		);

		setIsOpen(false);
	};

	return (
		<>
			<MagneticHover
				class="group relative grid"
				moveStrength={{ x: 10, y: 10 }}
				rotationStrength={0.05}
				hoverActiveScale={1.02}
				pressActiveScale={0.98}
				pressable
				hoverOpacity={0.95}
				refSignal={magneticHoverSignal}
			>
				<button type="button" onClick={open} tabIndex={-1}>
					<BlurShadow>
						<img
							src={props.thumbnailSrc}
							alt={props.thumbnailAlt}
							class="z-1 aspect-[5/4] cursor-pointer rounded-lg object-cover"
						/>
					</BlurShadow>
				</button>
				<button
					tabIndex={0}
					type="button"
					class="video-player-button bg-opacity-40 absolute bottom-5 left-5 z-1 flex cursor-pointer items-center rounded-lg bg-white px-4 py-3.5 text-black backdrop-blur-xl focus-visible:outline-white"
					onClick={open}
				>
					<Icon icon="play_arrow" class="h-6 w-6" />
					<span class="px-2">{props.callToAction}</span>
				</button>
			</MagneticHover>
			<Show when={isOpen()}>
				<Portal
					mount={
						typeof document !== "undefined" ?
							(document.querySelector("#portal") ?? undefined)
						:	undefined
					}
				>
					<div
						id="video-lightbox"
						class="fixed inset-0 flex items-center justify-center bg-black/50 p-4 opacity-0 backdrop-blur-sm"
						onClick={clickLightbox}
						onKeyDown={keyDownClose}
						ref={lightboxRef}
					>
						<video
							src={props.src}
							controls
							autoplay
							class="max-h-full max-w-full rounded-lg bg-black opacity-0"
							ref={videoRef}
						>
							<track kind="captions" />
						</video>
					</div>
				</Portal>
			</Show>
		</>
	);
};
