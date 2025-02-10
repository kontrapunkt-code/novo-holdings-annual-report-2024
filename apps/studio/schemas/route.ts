import { Draw } from "@carbon/icons-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "route",
	title: "Route",
	type: "document",
	icon: Draw,
	fields: [
		defineField({
			name: "start",
			title: "Start",
			type: "reference",
			to: [{ type: "location" }],
		}),
		defineField({
			name: "end",
			title: "End",
			type: "reference",
			to: [{ type: "location" }],
		}),
		defineField({
			name: "waypoints",
			title: "Waypoints",
			type: "array",
			of: [
				defineArrayMember({
					type: "geopoint",
				}),
			],
		}),
		defineField({
			name: "type",
			title: "Type",
			type: "string",
			description: "The type of route: 'ferry' or 'rail'",
			options: {
				list: [
					{ title: "Ferry", value: "ferry" },
					{ title: "Rail", value: "rail" },
				],
			},
			initialValue: "ferry",
		}),
		defineField({
			name: "filterGroups",
			title: "Filter Groups",
			validation: (rule) => rule.unique(),
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "filterGroup" }],
				}),
			],
		}),
		// defineField({
		// 	name: "services",
		// 	title: "Services",
		// 	validation: (rule) => rule.unique(),
		// 	type: "array",
		// 	of: [
		// 		defineArrayMember({
		// 			type: "reference",
		// 			options: {
		// 				filter: "category == 'Route'",
		// 			},
		// 			to: [{ type: "service" }],
		// 		}),
		// 	],
		// }),
	],
	preview: {
		select: {
			start: "start.location",
			end: "end.location",
			type: "type",
		},
		prepare({ start, end, type }) {
			return {
				title: start && end ? `${start} ↔ ${end}` : "Route",
				subtitle: type,
			};
		},
	},
});
