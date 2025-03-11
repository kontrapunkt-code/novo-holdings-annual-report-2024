import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "articleTextModule",
	title: "Article Text Module",
	type: "object",
	fields: [
		defineField({
			name: "content",
			type: "array",
			title: "Content",
			of: [
				defineArrayMember({
					type: "block",
					styles: [
						{ title: "Paragraph", value: "normal" },
						{ title: "H2", value: "h2" },
						{ title: "H3", value: "h3" },
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			subtitle: "content.0.children.0.text",
		},
		prepare({ subtitle }) {
			return {
				title: "Article Text",
				subtitle,
			};
		},
	},
});
