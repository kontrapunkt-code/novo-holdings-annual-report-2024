import { Link, TextBold, TextItalic } from "@carbon/icons-react";
import { defineArrayMember, defineField, defineType } from "sanity";

const blocks = [
	defineArrayMember({
		type: "block",
		styles: [
			{ title: "Normal", value: "normal" },
			{ title: "Headline", value: "h2" },
		],
		lists: [],
		marks: {
			decorators: [
				{ title: "Strong", value: "strong", icon: TextBold },
				{ title: "Emphasis", value: "em", icon: TextItalic },
			],
			annotations: [
				{
					title: "Link",
					type: "link",
					icon: Link,
				},
			],
		},
	}),
	defineArrayMember({
		name: "button",
		type: "button",
		title: "Button",
	}),
	defineArrayMember({
		name: "video",
		type: "video",
		title: "Video",
	}),
];

export default defineType({
	name: "sideBySideModule",
	title: "Side by Side Module",
	type: "object",
	fields: [
		defineField({
			name: "left",
			type: "array",
			title: "Left",
			of: blocks,
		}),
		defineField({
			name: "right",
			type: "array",
			title: "Right",
			of: blocks,
		}),
	],
	preview: {
		select: {
			subtitle: "left.0.children.0.text",
		},
		prepare({ subtitle }) {
			return {
				title: "Side by Side",
				subtitle,
			};
		},
	},
});
