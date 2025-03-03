import imageUrlBuilder from "@sanity/image-url";
import type {
	ImageUrlBuilderOptions,
	SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";

export function buildSanityImage(
	image?: SanityImageSource,
	options: ImageUrlBuilderOptions = {},
) {
	if (!image) return;

	const builder = imageUrlBuilder(sanityClient);

	const {
		width,
		height,
		format = "webp",
		quality = 80,
		fit = "crop",
	} = options;

	let urlBuilder = builder.image(image);

	if (width) urlBuilder = urlBuilder.width(width);
	if (height) urlBuilder = urlBuilder.height(height);
	if (typeof image !== "string" && "hotspot" in image) {
		urlBuilder = urlBuilder
			.fit(fit)
			.crop("focalpoint")
			.focalPoint(image.hotspot.x, image.hotspot.y);
	}

	return urlBuilder.format(format).quality(quality).url();
}
