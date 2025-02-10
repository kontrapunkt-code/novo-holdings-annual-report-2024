import { getCliClient } from "@sanity/cli";
import type { FilterGroup, Location } from "../typegen/sanity.types";

const client = getCliClient({
	token: import.meta.env.SANITY_STUDIO_TOKEN,
});

const main = async () => {
	console.log(import.meta.env.SANITY_STUDIO_TOKEN);
	try {
		// Fetch all location documents
		const locations = await client.fetch<Location[]>('*[_type == "location"]');

		console.log(`Found ${locations.length} locations to update`);

		const filterGroups = await client.fetch<FilterGroup[]>(
			"*[_type == 'filterGroup']",
		);

		// Update each location
		for (const location of locations) {
			if (location.filterGroups?.length) {
				console.log(
					`Skipping location ${location.location} - already has filter groups`,
				);
				continue;
			}

			// client
			// 	.patch(location._id)
			// 	.set({ geopoint: location.coordinates })
			// 	.commit()
			// 	.then(() => {
			// 		console.log(`Updated location ${location.location}`);
			// 	});

			client
				.patch(location._id)
				.setIfMissing({ filterGroups: [] })
				.append(
					"filterGroups",
					filterGroups.map((f) => ({
						_type: "reference",
						_ref: f._id,
					})),
				)
				.commit({ autoGenerateArrayKeys: true })
				.then(() => {
					console.log(`Updated location ${location.location}`);
				});

			// Prevent rate limiting
			await new Promise((resolve) => setTimeout(resolve, 100));

			break;
		}

		console.log("All locations updated successfully");
	} catch (error) {
		console.error("Failed to update locations:", error);
	}
};

main();
