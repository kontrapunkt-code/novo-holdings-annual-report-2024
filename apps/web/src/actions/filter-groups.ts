import { FILTER_GROUP_QUERY } from "@dfds-route-map/studio/queries";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sanityClient } from "sanity:client";

export const filterGroups = defineAction({
	input: z.null(),
	handler: async () => {
		const filterGroupDocuments = await sanityClient.fetch(FILTER_GROUP_QUERY);

		return {
			json: filterGroupDocuments,
			length: JSON.stringify(filterGroupDocuments).length,
		};
	},
});
