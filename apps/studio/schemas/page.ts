import { defineArrayMember, defineField, defineType } from "sanity";
import { defineSlugField } from "../lib";
import articleFigure from "./modules/article-figure";
import articleGallery from "./modules/article-gallery";
import articleQuote from "./modules/article-quote";
import articleStats from "./modules/article-stats";
import articleText from "./modules/article-text";
import atAGlance from "./modules/at-a-glance";
import caseHighlights from "./modules/case-highlights";
import highlights from "./modules/highlights";
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
			of: [
				articleFigure,
				articleGallery,
				articleQuote,
				articleStats,
				articleText,
				atAGlance,
				caseHighlights,
				highlights,
				sideBySide,
			].map(({ name: type }) => defineArrayMember({ type })),
		}),
		defineField({
			name: "case",
			title: "Case",
			type: "object",
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					name: "project",
					type: "string",
					title: "Project",
				}),
				defineField({
					name: "subTitle",
					type: "text",
					rows: 4,
					title: "Sub Title",
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
					type: "imageCombo",
					title: "Hero Image",
				}),
			],
		}),
	],
});
