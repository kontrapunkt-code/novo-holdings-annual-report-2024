import { Index } from "solid-js";

import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

export function CarouselDemo() {
	return (
		<Carousel class="w-full max-w-xs">
			<CarouselContent>
				<Index each={Array.from({ length: 5 })}>
					{(_, index) => (
						<CarouselItem>
							<div class="p-1">
								<figure class="flex aspect-square items-center justify-center p-6">
									<span class="text-4xl font-semibold">{index + 1}</span>
								</figure>
							</div>
						</CarouselItem>
					)}
				</Index>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
