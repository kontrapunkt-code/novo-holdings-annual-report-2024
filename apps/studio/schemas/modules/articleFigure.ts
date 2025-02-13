import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleFigureModule",
	title: "Article Figure Module",
	type: "object",
	fields: [
		defineField({
			name: "image",
			type: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
		}),
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
		defineField({
			name: "width",
			type: "string",
			title: "Width",
			options: {
				list: [
					{ title: "Full Width", value: "full" },
					{ title: "Medium", value: "medium" },
					{ title: "Small", value: "small" },
				],
			},
		}),
	],
});
