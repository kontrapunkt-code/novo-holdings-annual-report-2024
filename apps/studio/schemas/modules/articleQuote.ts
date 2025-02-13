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
			type: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
		}),
	],
	preview: {
		select: {
			author: "author",
			jobTitle: "jobTitle",
			image: "image",
		},
		prepare({ author, jobTitle, image }) {
			return {
				title: "Article Quote",
				subtitle: `${author} - ${jobTitle}`,
				media: image,
			};
		},
	},
});
