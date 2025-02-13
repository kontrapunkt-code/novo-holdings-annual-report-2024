import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleGalleryModule",
	title: "Article Gallery Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "images",
			type: "array",
			title: "Images",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: "caption",
							type: "string",
							title: "Caption",
						}),
						defineField({
							name: "alt",
							type: "string",
							title: "Alt Text",
						}),
					],
				},
			],
		}),
	],
});
