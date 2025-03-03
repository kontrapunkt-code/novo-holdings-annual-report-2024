import { defineField, defineType } from "sanity";

export default defineType({
	name: "articleQuoteModule",
	title: "Article Quote Module",
	type: "object",
	fields: [
		defineField({
			name: "quote",
			type: "text",
			title: "Quote",
		}),
		defineField({
			name: "author",
			type: "string",
			title: "Author",
		}),
		defineField({
			name: "jobTitle",
			type: "string",
			title: "Job Title",
		}),
		defineField({
			name: "image",
			type: "imageCombo",
			title: "Image",
		}),
	],
	preview: {
		select: {
			author: "author",
			jobTitle: "jobTitle",
			media: "image",
		},
		prepare({ author, jobTitle, media }) {
			return {
				title: "Article Quote",
				subtitle: `${author} - ${jobTitle}`,
				media,
			};
		},
	},
});
