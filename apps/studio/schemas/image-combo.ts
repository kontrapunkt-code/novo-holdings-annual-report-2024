import { defineField, defineType } from "sanity";

export default defineType({
	name: "imageCombo",
	title: "Image Combo",
	type: "image",
	options: {
		hotspot: true,
	},
	fields: [
		defineField({
			name: "alt",
			type: "text",
			rows: 4,
			title: "Alt Text",
		}),
		defineField({
			name: "caption",
			type: "text",
			rows: 4,
			title: "Caption",
		}),
	],
});
