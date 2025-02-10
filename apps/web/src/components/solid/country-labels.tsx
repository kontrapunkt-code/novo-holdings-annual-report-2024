import { GeoJSONSource } from "@/components/maplibre/geojson-source";
import { Layer } from "@/components/maplibre/layer";
import { BG_COUNTRY_LABEL_LAYER, FONT_STACK } from "@/scripts/const";
import { store } from "@/scripts/store";
import { COLORS } from "@dfds-route-map/lib";
import type { GeoJSONSourceSpecification } from "maplibre-gl";
import { type VoidComponent, createMemo } from "solid-js";

const COUNTRY_LABELS_SOURCE = "country-labels";
const COUNTRY_LABELS_POINTS = "country-labels-points";

export const CountryLabels: VoidComponent = () => {
	const countryLabels = createMemo<GeoJSONSourceSpecification>(() => ({
		type: "geojson",
		data: store.countryLabels ?? " ",
		cluster: false,
	}));

	return (
		<GeoJSONSource id={COUNTRY_LABELS_SOURCE} source={countryLabels()}>
			<Layer
				beforeId={BG_COUNTRY_LABEL_LAYER}
				layer={{
					id: COUNTRY_LABELS_POINTS,
					source: COUNTRY_LABELS_SOURCE,
					type: "symbol",
					layout: {
						"text-font": FONT_STACK,
						"text-field": "{iso_a2_eh}",
						"text-size": 10,
					},
					paint: {
						"text-color": COLORS.BG,
					},
				}}
			/>
		</GeoJSONSource>
	);
};
