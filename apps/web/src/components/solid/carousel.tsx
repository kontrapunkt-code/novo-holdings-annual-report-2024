import { Icon } from "@/components/solid/icon";
import type { PageModuleProps } from "@/scripts/queries";
import createEmblaCarousel from "embla-carousel-solid";
import type { ParentComponent } from "solid-js";

export const Carousel: ParentComponent<
	PageModuleProps<"articleGalleryModule">
> = (props) => {
	const [emblaRef, emblaApi] = createEmblaCarousel(() => ({
		slides: ".embla__slide",
		startIndex: 1,
	}));

	const previousSlide = () => {
		const api = emblaApi();
		if (!api) return;

		api.scrollPrev();
	};

	const nextSlide = () => {
		const api = emblaApi();
		if (!api) return;

		api.scrollNext();
	};

	return (
		<>
			<div class="embla site-grid overflow-hidden" ref={emblaRef}>
				<div class="embla__viewport col-span-full md:col-span-6 md:col-start-4">
					<div class="embla__container flex gap-4">{props.children}</div>
				</div>
			</div>
			<div class="site-grid">
				<div class="col-span-full mt-[2rem]">
					<button
						type="button"
						class="rounded-l-lg bg-[hsla(0,0%,0%,0.05)] p-[0.875rem]"
						onClick={previousSlide}
					>
						<span class="flex h-[1.5rem] w-[1.5rem]">
							<Icon icon="arrow_back" />
						</span>
					</button>
					<button
						type="button"
						class="rounded-r-lg bg-[hsla(0,0%,0%,0.05)] p-[0.875rem]"
						onClick={nextSlide}
					>
						<span class="flex h-[1.5rem] w-[1.5rem]">
							<Icon icon="arrow_forward" />
						</span>
					</button>
				</div>
			</div>
		</>
	);
};
