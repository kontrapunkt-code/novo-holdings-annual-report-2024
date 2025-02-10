import { Filter } from "@carbon/icons-react";
import { ICONS } from "@dfds-route-map/lib";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "filterGroup",
	title: "Filter Group",
	type: "document",
	icon: Filter,
	fields: [
		orderRankField({
			type: "filterGroup",
			newItemPosition: "before",
		}),
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "description",
			type: "text",
			rows: 5,
		}),
		defineField({
			name: "icon",
			type: "string",
			options: {
				list: ICONS.map((i) => i),
			},
		}),
		defineField({
			name: "facts",
			type: "array",
			of: [
				defineArrayMember({
					type: "string",
				}),
			],
		}),
		defineField({
			name: "services",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "service" }],
					options: {
						filter: ({ document }) => ({
							// Filter out services that are already referenced
							filter: "!(_id in *[_id == $filterGroupId][0].services[]._ref)",
							params: { filterGroupId: document?._id ?? "" },
						}),
					},
				}),
			],
			validation: (rule) => rule.unique(),
		}),
	],
});
