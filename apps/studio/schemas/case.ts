import { defineArrayMember, defineField, defineType } from "sanity";
import { modules } from "./modules";

export default defineType({
	name: "case",
	title: "Case",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: {
				source: "title",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "project",
			type: "string",
			title: "Project",
		}),
		defineField({
			name: "startDate",
			type: "date",
			title: "Start Date",
		}),
		defineField({
			name: "endDate",
			type: "date",
			title: "End Date",
		}),
		defineField({
			name: "heroImage",
			type: "image",
			title: "Hero Image",
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt Text",
				}),
			],
		}),
		defineField({
			name: "modules",
			type: "array",
			title: "Case Modules",
			of: modules.map((module) => defineArrayMember({ type: module.name })),
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "project",
			media: "heroImage",
		},
	},
});
