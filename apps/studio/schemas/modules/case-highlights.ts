import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "caseHighlightsModule",
	title: "Case Highlights Module",
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
			title: "Case Studies",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "case" }],
				}),
			],
			validation: (rule) => rule.max(3),
		}),
	],
});
