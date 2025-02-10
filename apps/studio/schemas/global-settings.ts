import { defineField, defineType } from "sanity";

export default defineType({
	name: "globalSettings",
	title: "Global settings",

	type: "document",
	fields: [
		defineField({
			name: "globalTitle",
			type: "string",
			title: "Global title",
			description: "The title of the website.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "logo",
			type: "file",
			title: "Logo",
			options: {
				accept: "image/svg+xml",
			},
		}),
		defineField({
			name: "homePage",
			type: "reference",
			title: "Home Page",
			description: "Select which page should be used as the home page",
			to: [{ type: "page" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "loadingScreenTitle",
			type: "string",
			title: "Loading screen title",
		}),
		defineField({
			name: "loadingScreenDescription",
			type: "text",
			title: "Loading screen description",
			rows: 3,
		}),
		defineField({
			name: "loadingScreenButtonText",
			type: "string",
			title: "Loading screen button text",
		}),
	],
});
