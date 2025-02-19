import type { ModuleProps } from "@/scripts/types";
import createEmblaCarousel from "embla-carousel-solid";
import type { ParentComponent } from "solid-js";

export const Carousel: ParentComponent<ModuleProps<"articleGalleryModule">> = (
	props,
) => {
	const [emblaRef, emblaApi] = createEmblaCarousel(() => ({
		slides: ".embla__slide",
		startIndex: 1,
		// loop: true,
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
			<div class="embla overflow-hidden site-grid" ref={emblaRef}>
				<div class="embla__viewport col-span-full md:col-span-6 md:col-start-4 ">
					<div class="embla__container flex gap-4">{props.children}</div>
				</div>
			</div>
			<div class="site-grid">
				<div class="mt-[2rem] col-span-full">
					<button
						type="button"
						class="rounded-l-lg p-[0.875rem] bg-[hsla(0,0%,0%,0.05)]"
						onClick={previousSlide}
					>
						Prev
					</button>
					<button
						type="button"
						class="rounded-r-lg p-[0.875rem] bg-[hsla(0,0%,0%,0.05)]"
						onClick={nextSlide}
					>
						Next
					</button>
				</div>
			</div>
		</>
	);
};
