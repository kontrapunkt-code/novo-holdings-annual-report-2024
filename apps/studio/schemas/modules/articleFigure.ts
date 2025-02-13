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
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt Text",
				}),
				defineField({
					name: "caption",
					type: "string",
					title: "Caption",
				}),
			],
		}),
	],
	preview: {
		select: {
			image: "image",
			alt: "image.alt",
			caption: "image.caption",
		},
		prepare({ image, alt, caption }) {
			return {
				title: "Article Figure",
				subtitle: `${alt ?? "No alt text"} - ${caption ?? "No caption"}`,
				media: image,
			};
		},
	},
});
