import countries from "@/data/countries-properties--wiped.geojson.json";
import { featureCollection, point } from "@turf/turf";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const countryLabels = defineAction({
	input: z.null(),
	handler: async () => {
		const countryLabels = featureCollection(
			countries.features
				.map((feature) =>
					point([feature.properties.label_x, feature.properties.label_y], {
						iso_a2_eh: feature.properties.iso_a2_eh,
					}),
				)
				.filter((feature) => feature.properties.iso_a2_eh !== "-99"),
		);

		return {
			json: countryLabels,
			length: JSON.stringify(countryLabels).length,
		};
	},
});
