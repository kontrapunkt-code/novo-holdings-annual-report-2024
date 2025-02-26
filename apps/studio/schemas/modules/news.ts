import { defineField, defineType } from "sanity";

export default defineType({
	name: "newsModule",
	title: "News Module",
	type: "object",
	fields: [
		defineField({
			name: "caption",
			type: "string",
			title: "Caption",
		}),
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
		}),
		defineField({
			name: "video",
			type: "file",
			title: "Video",
		}),
	],
	preview: {
		select: {
			subtitle: "title",
		},
		prepare({ subtitle }) {
			return {
				title: "News",
				subtitle,
			};
		},
	},
});
