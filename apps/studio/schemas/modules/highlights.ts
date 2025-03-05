import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "highlightsModule",
	title: "Highlights Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "highlights",
			type: "array",
			title: "Highlights",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
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
							name: "image",
							type: "imageCombo",
							title: "Image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "link",
							type: "link",
							title: "Link",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			subtitle: "highlights.0.title",
		},
		prepare({ subtitle }) {
			return {
				title: "Highlights",
				subtitle,
			};
		},
	},
});
