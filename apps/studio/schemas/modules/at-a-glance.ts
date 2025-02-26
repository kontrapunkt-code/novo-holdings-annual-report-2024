import { defineField, defineType } from "sanity";

export default defineType({
	name: "atAGlanceModule",
	title: "At a Glance Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "animations",
			type: "array",
			title: "Animations",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "lottie",
							type: "file",
							title: "Lottie",
							options: {
								accept: "application/json",
							},
						}),
					],
					preview: {
						select: {
							title: "lottie.asset.originalFilename",
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			subtitle: "title",
		},
		prepare({ subtitle }) {
			return {
				title: "At a Glance",
				subtitle,
			};
		},
	},
});
