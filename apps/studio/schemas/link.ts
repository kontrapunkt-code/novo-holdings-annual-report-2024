import { defineField, defineType } from "sanity";

export default defineType({
	name: "link",
	type: "object",
	fields: [
		defineField({
			name: "text",
			type: "string",
		}),
		defineField({
			name: "page",
			type: "reference",
			to: [{ type: "page" }],
		}),
		defineField({
			name: "external",
			type: "url",
		}),
		defineField({
			name: "mailto",
			type: "string",
		}),
		defineField({
			name: "tel",
			type: "string",
		}),
	],
});
