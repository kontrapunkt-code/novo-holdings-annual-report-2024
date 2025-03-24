import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleFigureModule",
	title: "Article Figure Module",
	type: "object",
	fields: [
		defineField({
			name: "fullWidth",
			type: "boolean",
			title: "Full Width",
			initialValue: false,
		}),
		defineField({
			name: "image",
			type: "imageCombo",
			title: "Image",
		}),
	],
	preview: {
		select: {
			media: "image",
		},
		prepare({ media }) {
			return {
				title: "Article Figure",
				subtitle: `${media?.alt ?? "No alt text"}`,
				media,
			};
		},
	},
});
