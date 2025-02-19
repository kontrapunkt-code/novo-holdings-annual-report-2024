import type { ModuleProps } from "@/scripts/types";
import createEmblaCarousel from "embla-carousel-solid";
import { onMount, type ParentComponent } from "solid-js";

export const Carousel: ParentComponent<ModuleProps<"articleGalleryModule">> = (
	props,
) => {
	const [emblaRef, emblaApi] = createEmblaCarousel(() => ({
		slides: ".embla__slide",
	}));

	// onMount(() => {
	// 	const api = emblaApi();
	// 	if (api) {
	// 		console.log(api.slideNodes()); // Access API
	// 	}
	// });

	return (
		<div class="embla" ref={emblaRef}>
			<div className="embla__viewport">
				<div class="embla__container">{props.children}</div>
			</div>

			<div class="px-[1.5rem] md:px-[3rem]">
				<button class="embla__prev">Prev</button>
				<button class="embla__next">Next</button>
			</div>
		</div>
	);
};
