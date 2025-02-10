import type { MaxBounds } from "@/env";
import { LOCATION_QUERY } from "@dfds-route-map/studio/queries";
import { bbox } from "@turf/turf";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sanityClient } from "sanity:client";

export const maxBounds = defineAction({
	input: z.null(),
	handler: async () => {
		const locations = await sanityClient.fetch(LOCATION_QUERY);
		const bounds = bbox(locations);
		const paddedBounds = [
			bounds[0],
			bounds[1],
			bounds[2],
			bounds[3],
		] satisfies MaxBounds;

		return {
			json: paddedBounds,
			length: JSON.stringify(paddedBounds).length,
		};
	},
});
