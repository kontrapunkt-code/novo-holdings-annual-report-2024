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
			type: "string",
			title: "Alt Text",
		}),
		defineField({
			name: "caption",
			type: "string",
			title: "Caption",
		}),
	],
});
