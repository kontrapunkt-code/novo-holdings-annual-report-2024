import { GeoJSONSource } from "@/components/maplibre/geojson-source";
import { Layer } from "@/components/maplibre/layer";
import type { ActionResult } from "@/env";
import { BG_COUNTRY_LAYER, COUNTRIES_DETAIL_LEVELS } from "@/scripts/const";
import { setStore, store } from "@/scripts/store";
import { COLORS } from "@dfds-route-map/lib";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { GeoJSONSourceSpecification } from "maplibre-gl";
import {
	type VoidComponent,
	createMemo,
	createResource,
	createSignal,
} from "solid-js";

export const COUNTRIES_SOURCE_ID = "countries";
export const COUNTRIES_FILL_LAYER_ID = `${COUNTRIES_SOURCE_ID}-fill`;
export const COUNTRIES_OUTLINE_LAYER_ID = `${COUNTRIES_SOURCE_ID}-outline`;

export const Countries: VoidComponent = () => {
	const [detail, setDetail] = createSignal<
		(typeof COUNTRIES_DETAIL_LEVELS)[number]
	>(COUNTRIES_DETAIL_LEVELS[0]);

	const context = createMemo(() => ({
		map: store.map,
		detail: detail(),
	}));

	const [source, setSource] = createSignal<GeoJSONSourceSpecification>({
		type: "geojson",
		data: {
			type: "FeatureCollection",
			features: [],
		},
	});

	createResource(context, async (context) => {
		if (!context.map) return;

		const response = await fetch(`/api/countries-${context.detail}.json`);
		const countries: ActionResult<FeatureCollection<Polygon | MultiPolygon>> =
			await response.json();
		window.dispatchEvent(
			new CustomEvent("loader-data", { detail: countries.length }),
		);

		if (!countries) return;

		setSource({
			type: "geojson",
			data: countries.json,
		});

		setStore({ countries: context.detail });

		const detailIndex = COUNTRIES_DETAIL_LEVELS.indexOf(context.detail);
		const nextDetail = COUNTRIES_DETAIL_LEVELS.at(detailIndex + 1);
		if (nextDetail) setDetail(nextDetail);
	});

	return (
		<GeoJSONSource id={COUNTRIES_SOURCE_ID} source={source()}>
			<Layer
				beforeId={BG_COUNTRY_LAYER}
				layer={{
					id: COUNTRIES_FILL_LAYER_ID,
					type: "fill",
					source: COUNTRIES_SOURCE_ID,
					paint: {
						"fill-color": COLORS.WHITE,
						"fill-opacity": 1,
					},
					layout: {
						visibility: "visible",
					},
				}}
			/>
			<Layer
				beforeId={BG_COUNTRY_LAYER}
				layer={{
					id: COUNTRIES_OUTLINE_LAYER_ID,
					type: "line",
					source: COUNTRIES_SOURCE_ID,
					paint: {
						"line-color": COLORS.BG,
						"line-width": 1,
						"line-opacity": 1,
					},
					layout: {
						visibility: "visible",
					},
				}}
			/>
		</GeoJSONSource>
	);
};
