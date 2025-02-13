import { defineField, defineType } from "sanity";

export default defineType({
	name: "highlightsModule",
	title: "Highlights Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "highlights",
			type: "array",
			title: "Highlights",
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
							title: "Link to Page",
							to: [{ type: "page" }],
						}),
					],
				},
			],
		}),
	],
});
