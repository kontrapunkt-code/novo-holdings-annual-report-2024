import { ICONS } from "@novo-holdings-annual-report-2024/lib";
import { defineField } from "sanity";

export default defineField({
	name: "icon",
	type: "string",
	title: "Icon",
	options: {
		list: ICONS.map((icon) => icon),
	},
});
