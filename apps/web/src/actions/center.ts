import { LOCATION_QUERY } from "@dfds-route-map/studio/queries";
import { featureCollection, point, center as turfCenter } from "@turf/turf";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sanityClient } from "sanity:client";

export const center = defineAction({
	input: z.null(),
	handler: async () => {
		const locations = await sanityClient.fetch(LOCATION_QUERY);
		if (!locations.features.length) {
			return {
				json: featureCollection([point([0, 0])]),
				length: 0,
			};
		}
		const center = turfCenter(locations);

		return {
			json: center,
			length: JSON.stringify(center).length,
		};
	},
});
