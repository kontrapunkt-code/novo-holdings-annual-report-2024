import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleQuoteModule",
	title: "Article Quote Module",
	type: "object",
	fields: [
		defineField({
			name: "quote",
			type: "text",
			title: "Quote",
		}),
		defineField({
			name: "author",
			type: "string",
			title: "Author",
		}),
		defineField({
			name: "role",
			type: "string",
			title: "Role",
		}),
	],
});
