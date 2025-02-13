import { defineField, defineType } from "sanity";

export default defineType({
	name: "caseHighlightsModule",
	title: "Case Highlights Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
		}),
		defineField({
			name: "cases",
			type: "array",
			title: "Case Studies",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "title",
							type: "string",
							title: "Title",
						}),
						defineField({
							name: "description",
							type: "text",
							title: "Description",
						}),
						defineField({
							name: "period",
							type: "string",
							title: "Time Period",
							description: "e.g. 2020-2024",
						}),
						defineField({
							name: "image",
							type: "image",
							title: "Image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "link",
							type: "reference",
							title: "Link to Case",
							to: [{ type: "page" }],
						}),
						defineField({
							name: "featured",
							type: "boolean",
							title: "Featured Case",
						}),
					],
				},
			],
		}),
	],
});
