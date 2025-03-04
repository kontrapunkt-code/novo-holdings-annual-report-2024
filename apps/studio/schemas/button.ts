import { ButtonCentered } from "@carbon/icons-react";
import { defineField } from "sanity";

export default defineField({
	name: "button",
	type: "object",
	title: "Button",
	icon: ButtonCentered,
	fields: [
		defineField({
			name: "icon",
			type: "icon",
		}),
		defineField({
			name: "link",
			type: "link",
		}),
	],
	preview: {
		select: {
			subtitle: "link.text",
		},
		prepare({ subtitle }) {
			return { title: "Button", subtitle };
		},
	},
});
