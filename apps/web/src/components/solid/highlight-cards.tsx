import { BlurShadow } from "@/components/solid/blur-shadow";
import { Icon } from "@/components/solid/icon";
import { Link } from "@/components/solid/link";
import { MagneticHover } from "@/components/solid/magnetic-hover";
import { SanityImage } from "@/components/solid/sanity-image";
import { vh } from "@/scripts/helpers";
import type { PageModuleProps } from "@/scripts/queries";
import type Lenis from "lenis";
import { animate } from "motion";
import { For, type VoidComponent, createSignal } from "solid-js";

interface Props {
	highlights: PageModuleProps<"highlightsModule">["highlights"];
}

export const HighlightCards: VoidComponent<Props> = (props) => {
	let overlay: HTMLDivElement | undefined;

	const [activeButton, setActiveButton] = createSignal<HTMLButtonElement>();

	const handleClick = async (event: MouseEvent) => {
		const button = event.currentTarget;
		if (!(button instanceof HTMLButtonElement) || !overlay || activeButton()) {
			return;
		}

		button.dataset.active = "true";
		setActiveButton(button);

		const { width, height, x, y } = button.getBoundingClientRect();
		const maxWidth = document.documentElement.clientWidth - 48;
		const maxHeight = vh() - 144;

		const widthRatio = maxWidth / width;
		const heightRatio = maxHeight / height;
		const scale = Math.min(widthRatio, heightRatio);

		const targetX =
			document.documentElement.clientWidth * 0.5 - x - width * 0.5;
		const targetY = vh() * 0.5 - y - height * 0.5;

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

		const child = button.querySelector("*");
		if (child instanceof HTMLElement) {
			child.dataset.paused = "true";

			animate(
				child,
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
			".hightlight-button:not([data-active='true'])",
			{
				zIndex: 0,
			},
			{
				duration: 0,
			},
		);

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

		setTimeout(async () => {
			window.addEventListener("click", handleClose);
			window.addEventListener("keydown", handleClose);

			const { lenis } = await import("@/scripts/lenis");
			lenis.on("scroll", handleClose);
		}, 100);
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

		button.removeAttribute("data-active");

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

		const child = button.querySelector("*");
		if (child instanceof HTMLElement) {
			child.removeAttribute("data-paused");

			animate(
				child,
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

		animate(
			".hightlight-button:not([data-active='true'])",
			{
				zIndex: 0,
			},
			{
				duration: 0,
				delay: 0.3,
			},
		);
	};

	return (
		<>
			<For each={props.highlights}>
				{(highlight) => (
					<figure class="col-span-4 cursor-pointer md:col-span-6">
						<button
							type="button"
							onClick={handleClick}
							class="hightlight-button focus-visible:outline-blue-grey pointer-events-none relative mb-4 w-full cursor-pointer rounded-lg md:pointer-events-auto"
						>
							<MagneticHover
								hoverActiveScale={1.02}
								hoverOpacity={0.9}
								pressActiveScale={1}
								zIndex={1}
								pressable
								class="[[data-paused='true']]:pointer-events-none"
							>
								<BlurShadow>
									<Link link={highlight.link} class="rounded-lg pb-[1.25rem]">
										{highlight.image && (
											<SanityImage
												{...highlight.image}
												alt={highlight.title ?? ""}
												width={1200}
												class="h-auto w-full rounded-lg"
												sizes="(min-width: 1280px) 1200px, 100vw"
											/>
										)}
									</Link>
								</BlurShadow>
							</MagneticHover>
						</button>
						<figcaption class="headline-card mb-8 flex items-start gap-[0.5rem] md:mb-0">
							{highlight.title}
						</figcaption>
					</figure>
				)}
			</For>
			<div
				class="pointer-events-none fixed inset-0 z-101 bg-white/20 opacity-0 backdrop-blur-sm"
				ref={overlay}
			>
				<Icon
					icon="close"
					class="text-novo-blue absolute top-4 right-4 h-6 w-6 cursor-pointer transition-all duration-300 hover:scale-[1.3] hover:opacity-70"
				/>
			</div>
		</>
	);
};
