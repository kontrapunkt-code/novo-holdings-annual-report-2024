import { defineField, defineType } from "sanity";

export default defineType({
	name: "sideBySideModule",
	title: "Side by Side Module",
	type: "object",
	fields: [
		defineField({
			name: "caption",
			type: "string",
			title: "Caption",
		}),
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "description",
			type: "string",
			title: "Description",
		}),
		defineField({
			name: "buttonText",
			type: "string",
			title: "Button Text",
		}),
		defineField({
			name: "link",
			type: "link",
			title: "Link",
		}),
	],
	preview: {
		select: {
			subtitle: "title",
		},
		prepare({ subtitle }) {
			return {
				title: "Side by Side",
				subtitle,
			};
		},
	},
});
