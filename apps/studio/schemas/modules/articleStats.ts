import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleStatsModule",
	title: "Article Stats Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "stats",
			type: "array",
			title: "Statistics",
			of: [{ type: "text", rows: 2 }],
		}),
	],
	preview: {
		select: {
			title: "title",
			stats: "stats",
		},
		prepare({ title, stats }) {
			return {
				title: "Article Stats",
				subtitle: `${title} - ${stats.length} stats`,
			};
		},
	},
});
