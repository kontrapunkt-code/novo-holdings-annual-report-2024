import { defineArrayMember, defineField, defineType } from "sanity";

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
				defineArrayMember({
					type: "reference",
					to: [{ type: "case" }],
				}),
			],
			validation: (rule) => rule.max(3),
		}),
	],
	preview: {
		select: {
			title: "title",
			cases: "cases",
		},
		prepare({ title, cases }) {
			return {
				title: "Article Related Cases",
				subtitle: `${title} - ${cases?.length} cases`,
			};
		},
	},
});
