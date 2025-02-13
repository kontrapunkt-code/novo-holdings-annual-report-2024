import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleRelatedCasesModule",
	title: "Article Related Cases Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "cases",
			type: "array",
			title: "Related Cases",
			of: [
				{
					type: "reference",
					to: [{ type: "page" }],
				},
			],
			validation: (Rule) => Rule.max(3),
		}),
	],
});
