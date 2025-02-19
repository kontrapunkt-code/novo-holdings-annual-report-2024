import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleGalleryModule",
	title: "Article Gallery Module",
	type: "object",
	fields: [
		defineField({
			name: "caption",
			type: "string",
			title: "Caption",
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
		}),
		defineField({
			name: "buttonText",
			type: "string",
			title: "Button Text",
		}),
		defineField({
			name: "link",
			type: "string",
			title: "Link",
		}),
		defineField({
			name: "images",
			type: "array",
			title: "Images",
			of: [{ type: "image" }],
		}),
	],
});
