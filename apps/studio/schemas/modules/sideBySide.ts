import { defineField, defineType } from "sanity";

export default defineType({
	name: "sideBySideModule",
	title: "Side by Side Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "leftContent",
			type: "array",
			title: "Left Content",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "rightContent",
			type: "array",
			title: "Right Content",
			of: [{ type: "block" }],
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
			name: "imagePosition",
			type: "string",
			title: "Image Position",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
				],
			},
		}),
	],
});
