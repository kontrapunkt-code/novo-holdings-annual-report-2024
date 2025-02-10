import { COUNTRIES } from "@dfds-route-map/lib/countries";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "countries",
	title: "Countries",
	type: "document",
	fields: [
		defineField({
			name: "countriesToExclude",
			title: "Countries to Exclude",
			type: "array",
			of: [defineArrayMember({ type: "string" })],
			options: {
				list: COUNTRIES.features.map(({ properties }) => ({
					value: properties.sov_a3,
					title: properties.sovereignt,
				})),
				layout: "list",
			},
		}),
	],
});
