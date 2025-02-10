import { Layer } from "@/components/maplibre/layer";
import { Background } from "@/components/solid/background";
import { Countries } from "@/components/solid/countries";
import { CountryLabels } from "@/components/solid/country-labels";
import { LocationManager } from "@/components/solid/location-manager";
import { Routes } from "@/components/solid/routes";
import {
	BG_COUNTRY_LABEL_LAYER,
	BG_COUNTRY_LAYER,
	BG_LOCATION_LAYER,
	BG_ROUTE_LAYER,
	TOP_LAYER,
} from "@/scripts/const";
import type { VoidComponent } from "solid-js";

export const LayerOrder: VoidComponent = () => {
	return (
		<div class="layers">
			<EmptyLayer id={TOP_LAYER} />
			<EmptyLayer id={BG_LOCATION_LAYER} beforeId={TOP_LAYER} />
			<EmptyLayer id={BG_ROUTE_LAYER} beforeId={BG_LOCATION_LAYER} />
			<EmptyLayer id={BG_COUNTRY_LABEL_LAYER} beforeId={BG_ROUTE_LAYER} />
			<EmptyLayer id={BG_COUNTRY_LAYER} beforeId={BG_COUNTRY_LABEL_LAYER} />
			<Background />
			<Countries />
			<CountryLabels />
			<Routes />
			<LocationManager />
		</div>
	);
};

function EmptyLayer(props: { id: string; beforeId?: string }) {
	return (
		<Layer
			layer={{
				id: props.id,
				type: "background",
				layout: {
					visibility: "none",
				},
			}}
			beforeId={props.beforeId}
		/>
	);
}
