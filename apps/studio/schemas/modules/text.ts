import { defineField, defineType } from "sanity";

export default defineType({
	name: "textModule",
	title: "Text Module",
	type: "object",
	fields: [
		defineField({
			name: "content",
			type: "array",
			title: "Content",
			of: [{ type: "block" }],
		}),
	],
});
