import { Icon } from "@/components/solid/icon";
import type { CaseModuleProps } from "@/scripts/queries";
import createEmblaCarousel from "embla-carousel-solid";
import type { ParentComponent } from "solid-js";

export const Carousel: ParentComponent<
	CaseModuleProps<"articleGalleryModule">
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
						<span class="flex w-[1.5rem] h-[1.5rem]">
							<Icon icon="arrow_back" />
						</span>
					</button>
					<button
						type="button"
						class="rounded-r-lg p-[0.875rem] bg-[hsla(0,0%,0%,0.05)]"
						onClick={nextSlide}
					>
						<span class="flex w-[1.5rem] h-[1.5rem]">
							<Icon icon="arrow_forward" />
						</span>
					</button>
				</div>
			</div>
		</>
	);
};
