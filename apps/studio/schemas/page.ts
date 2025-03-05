import { defineArrayMember, defineField, defineType } from "sanity";
import { defineSlugField } from "../lib";
import atAGlance from "./modules/at-a-glance";
import caseHighlights from "./modules/case-highlights";
import highlights from "./modules/highlights";
import news from "./modules/news";
import sideBySide from "./modules/side-by-side";

export default defineType({
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "The title of the page.",
			validation: (rule) => rule.required(),
		}),
		defineSlugField({
			name: "slug",
			type: "slug",
		}),
		defineField({
			name: "modules",
			type: "array",
			title: "Page Modules",
			description: "Add, edit, and reorder page sections",
			of: [atAGlance, highlights, news, sideBySide, caseHighlights].map(
				(module) => defineArrayMember({ type: module.name }),
			),
		}),
	],
});
