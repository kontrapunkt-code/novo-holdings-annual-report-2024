import { defineField, defineType } from "sanity";

export default defineType({
	name: "imageModule",
	title: "Image Module",
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
	],
});
