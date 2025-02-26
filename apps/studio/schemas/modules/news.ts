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
			options: {
				accept: "video/*",
			},
			fields: [
				defineField({
					name: "callToAction",
					type: "string",
					title: "Call to Action",
				}),
				defineField({
					name: "thumbnail",
					type: "imageCombo",
					title: "Thumbnail",
				}),
			],
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
