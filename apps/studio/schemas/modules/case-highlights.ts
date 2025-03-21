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
			title: "Case Studies",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "page" }],
				}),
			],
		}),
	],
});
