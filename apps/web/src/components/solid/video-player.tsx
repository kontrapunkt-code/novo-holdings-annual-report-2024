import { Icon } from "@/components/solid/icon";
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
	callToAction?: string;
}

export const VideoPlayer: VoidComponent<VideoPlayerProps> = (
	props: VideoPlayerProps,
) => {
	const [videoRef, setVideoRef] = createSignal<HTMLVideoElement>();
	const [lightboxRef, setLightboxRef] = createSignal<HTMLDivElement>();
	const [isOpen, setIsOpen] = createSignal<boolean>(false);

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
		const video = videoRef();
		const lightbox = lightboxRef();
		if (!video || !lightbox) return;

		animate(lightbox, { opacity: 1 }, { duration: 0.2, ease: EASE_OUT_CUBIC });
		animate(
			video,
			{ scale: [0.8, 1], opacity: 1 },
			{ duration: 0.2, ease: EASE_OUT_CUBIC, delay: 0.1 },
		);

		const { lenis } = await import("@/scripts/lenis");
		lenis.on("scroll", close);
	};

	const keyDownOpen = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			open();
		}
	};

	const keyDownClose = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			close();
		}
	};

	const closeLightbox = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			close();
		}
	};

	const close = async () => {
		const video = videoRef();
		const lightbox = lightboxRef();
		if (!video || !lightbox) return;

		const { lenis } = await import("@/scripts/lenis");
		lenis.off("scroll", close);

		animate(lightbox, { opacity: 0 }, { duration: 0.2, ease: EASE_OUT_CUBIC });
		await animate(
			video,
			{ scale: 0.8, opacity: 0 },
			{ duration: 0.2, ease: EASE_OUT_CUBIC },
		);

		setIsOpen(false);
	};

	return (
		<>
			<div class="relative">
				<img
					src={props.thumbnailSrc}
					alt={props.thumbnailAlt}
					onClick={open}
					onKeyDown={keyDownOpen}
					class="cursor-pointer rounded-lg"
				/>
				<button
					type="button"
					class="absolute rounded-lg left-5 bottom-5 px-4 py-3.5 bg-white bg-opacity-40 backdrop-blur-xl flex items-center text-black cursor-pointer"
					onClick={open}
					onKeyDown={keyDownOpen}
				>
					<Icon icon="play_arrow" class="w-6 h-6" />
					<span class="px-2">{props.callToAction}</span>
				</button>
			</div>
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
						class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center opacity-0 p-4 "
						onClick={closeLightbox}
						onKeyDown={keyDownClose}
						ref={setLightboxRef}
					>
						<video
							src={props.src}
							controls
							autoplay
							class="rounded-lg opacity-0 bg-black max-h-full max-w-full"
							ref={setVideoRef}
						>
							<track kind="captions" />
						</video>
					</div>
				</Portal>
			</Show>
		</>
	);
};
