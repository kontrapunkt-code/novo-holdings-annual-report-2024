import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleTextModule",
	title: "Article Text Module",
	type: "object",
	fields: [
		defineField({
			name: "content",
			type: "array",
			title: "Content",
			of: [{ type: "block" }],
		}),
	],
	preview: {
		select: {
			content: "content",
		},
		prepare({ content }) {
			return {
				title: "Article Text",
				subtitle: `${content.length} blocks`,
			};
		},
	},
});
