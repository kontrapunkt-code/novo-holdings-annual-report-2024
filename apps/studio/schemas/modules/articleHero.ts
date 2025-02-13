import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleHeroModule",
	title: "Article Hero Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Hero Image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
		}),
	],
});
