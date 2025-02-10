import { GLOBAL_SETTINGS_QUERY } from "@dfds-route-map/studio/queries";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sanityClient } from "sanity:client";

export const globalSettings = defineAction({
	input: z.null(),
	handler: async () => {
		const globalSettingsDocuments = await sanityClient.fetch(
			GLOBAL_SETTINGS_QUERY,
		);

		return {
			json: globalSettingsDocuments,
			length: JSON.stringify(globalSettingsDocuments).length,
		};
	},
});
