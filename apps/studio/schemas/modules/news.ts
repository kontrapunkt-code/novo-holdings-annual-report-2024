import { defineField, defineType } from "sanity";

export default defineType({
	name: "newsModule",
	title: "News Module",
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
			name: "newsItems",
			type: "array",
			title: "News Items",
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
							name: "date",
							type: "date",
							title: "Date",
						}),
						defineField({
							name: "excerpt",
							type: "text",
							title: "Excerpt",
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
							type: "url",
							title: "External Link",
						}),
					],
				},
			],
		}),
	],
});
