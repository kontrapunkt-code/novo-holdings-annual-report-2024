import { ROUTE_QUERY } from "@dfds-route-map/studio/queries";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { FeatureCollection, LineString } from "geojson";
import { sanityClient } from "sanity:client";

export const routes = defineAction({
	input: z.null(),
	handler: async () => {
		const routes: FeatureCollection<LineString> =
			await sanityClient.fetch(ROUTE_QUERY);

		return {
			json: routes,
			length: JSON.stringify(routes).length,
		};
	},
});
