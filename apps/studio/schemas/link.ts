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
			to: [{ type: "page" }, { type: "case" }],
		}),
		defineField({
			name: "external",
			type: "string",
		}),
		defineField({
			name: "mailto",
			type: "string",
		}),
		defineField({
			name: "phone",
			type: "string",
		}),
	],
});
