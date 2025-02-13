import { defineField, defineType } from "sanity";

export default defineType({
	name: "atAGlanceModule",
	title: "At a Glance Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "items",
			type: "array",
			title: "Items",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "label",
							type: "string",
							title: "Label",
						}),
						defineField({
							name: "value",
							type: "string",
							title: "Value",
						}),
					],
				},
			],
		}),
	],
});
