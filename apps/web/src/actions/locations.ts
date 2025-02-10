import { LOCATION_QUERY } from "@dfds-route-map/studio/queries";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { FeatureCollection, Point } from "geojson";
import { sanityClient } from "sanity:client";

export const locations = defineAction({
	input: z.null(),
	handler: async () => {
		const locations: FeatureCollection<Point> =
			await sanityClient.fetch(LOCATION_QUERY);

		return {
			json: locations,
			length: JSON.stringify(locations).length,
		};
	},
});
