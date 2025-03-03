import { defineArrayMember, defineField, defineType } from "sanity";
import articleFigure from "./modules/article-figure";
import articleGallery from "./modules/article-gallery";
import articleQuote from "./modules/article-quote";
import articleStats from "./modules/article-stats";
import articleText from "./modules/article-text";
import caseHighlights from "./modules/case-highlights";

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
			type: "imageCombo",
			title: "Hero Image",
		}),
		defineField({
			name: "modules",
			type: "array",
			title: "Case Modules",
			of: [
				articleText,
				articleQuote,
				articleStats,
				articleGallery,
				articleFigure,
				caseHighlights,
			].map((module) => defineArrayMember({ type: module.name })),
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
