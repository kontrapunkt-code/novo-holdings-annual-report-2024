import { Need } from "@carbon/icons-react";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "service",
	title: "Service",
	type: "document",
	icon: Need,
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			type: "string",
			initialValue: "Location",
			options: {
				list: ["Route", "Location"],
			},
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "category",
		},
	},
});
