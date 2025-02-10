import { defineArrayMember, defineField, defineType } from "sanity";
import { modules } from "./modules";

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
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "The URL path for this page",
			options: {
				source: "title",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "modules",
			type: "array",
			title: "Page Modules",
			description: "Add, edit, and reorder page sections",
			of: modules.map((module) => defineArrayMember({ type: module.name })),
		}),
	],
});
