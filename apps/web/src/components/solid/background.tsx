import { Layer } from "@/components/maplibre/layer";
import { BG_COUNTRY_LAYER, BG_LAYER } from "@/scripts/const";
import { COLORS } from "@dfds-route-map/lib";
import type { VoidComponent } from "solid-js";

export const Background: VoidComponent = () => {
	return (
		<Layer
			beforeId={BG_COUNTRY_LAYER}
			layer={{
				id: BG_LAYER,
				type: "background",
				paint: {
					"background-color": COLORS.BG,
					"background-opacity": 0,
				},
			}}
		/>
	);
};
