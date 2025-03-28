import { buildSanityImage } from "@/scripts/image-url-builder";
import type {
	SanityImageAsset,
	SanityImageCrop,
	SanityImageHotspot,
} from "@novo-holdings-annual-report-2024/studio/types";
import { Show, type VoidComponent, mergeProps } from "solid-js";

interface Props {
	_type?: "imageCombo";
	caption?: string | null;
	asset: SanityImageAsset | null;
	hotspot?: SanityImageHotspot | null;
	crop?: SanityImageCrop | null;
	alt?: string | null;
	width?: number;
	height?: number;
	class?: string;
	sizes?: string;
	dpr?: number;
}

export const SanityImage: VoidComponent<Props> = (props) => {
	const merged = mergeProps(
		{
			alt: "",
			width: 1504,
			height: undefined,
			sizes: undefined,
			dpr: undefined,
		},
		props,
	);

	if (!merged.asset) return null;

	const maxWidth = 1504;
	const maxHeight = 1504;
	const finalWidth = Math.min(merged.width ?? maxWidth, maxWidth);
	const finalHeight =
		merged.height
		?? Math.min(
			Math.round(
				finalWidth / (merged.asset?.metadata?.dimensions?.aspectRatio ?? 1),
			),
			maxHeight,
		);

	const url = buildSanityImage(merged.asset, {
		width: finalWidth,
		height: finalHeight,
		dpr: merged.dpr,
	});

	return (
		<div class={`${merged.class || ""} relative overflow-hidden`}>
			<Show when={merged.asset.metadata?.lqip}>
				<img
					src={merged.asset.metadata?.lqip ?? ""}
					alt={merged.alt ?? ""}
					class={`${merged.class || ""} absolute -z-1 h-full w-full blur-xl`}
					width={finalWidth}
					height={finalHeight}
					sizes={merged.sizes}
				/>
			</Show>
			<img
				src={url ?? ""}
				alt={merged.alt ?? ""}
				class={merged.class}
				width={finalWidth}
				height={finalHeight}
				sizes={merged.sizes}
			/>
		</div>
	);
};
