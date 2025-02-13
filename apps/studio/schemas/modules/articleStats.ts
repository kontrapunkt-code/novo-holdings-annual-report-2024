import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleStatsModule",
	title: "Article Stats Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "stats",
			type: "array",
			title: "Statistics",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "value",
							type: "string",
							title: "Value",
						}),
						defineField({
							name: "label",
							type: "string",
							title: "Label",
						}),
						defineField({
							name: "description",
							type: "text",
							title: "Description",
						}),
					],
				},
			],
		}),
	],
});
