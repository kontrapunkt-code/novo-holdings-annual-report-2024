import {
	OpenPanelBottom,
	OpenPanelTop,
	Settings,
	Share,
} from "@carbon/icons-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "globalSettings",
	title: "Global settings",
	type: "document",
	groups: [
		{ name: "settings", title: "Settings", icon: Settings, default: true },
		{ name: "social", title: "Social", icon: Share },
		{ name: "header", title: "Header", icon: OpenPanelTop },
		{ name: "footer", title: "Footer", icon: OpenPanelBottom },
	],
	fields: [
		defineField({
			name: "globalTitle",
			type: "string",
			title: "Global title",
			description: "The title of the website.",
			group: "settings",
		}),
		defineField({
			name: "homePage",
			type: "reference",
			to: [{ type: "page" }],
			title: "Home Page",
			description: "Select which page should be used as the home page",
			group: "settings",
		}),
		defineField({
			name: "header",
			title: "Header",
			group: "header",
			type: "object",
			fields: [
				defineField({
					name: "subtitle",
					type: "string",
					title: "Subtitle",
				}),
				defineField({
					name: "subtitleLine2",
					type: "string",
					title: "Subtitle line 2",
				}),
				defineField({
					name: "callToAction",
					type: "link",
					title: "Call to action",
				}),
			],
		}),
		defineField({
			name: "footer",
			type: "object",
			title: "Footer",
			group: "footer",
			fields: [
				defineField({
					name: "logo",
					type: "file",
					title: "Logo",
					options: {
						accept: "image/svg+xml",
					},
				}),
				defineField({
					name: "copyright",
					type: "text",
					title: "Copyright",
					rows: 10,
				}),
				defineField({
					name: "backlink",
					type: "link",
					title: "Backlink",
				}),
				defineField({
					name: "links",
					type: "array",
					title: "Links",
					of: [defineArrayMember({ type: "link" })],
				}),
			],
		}),
	],
});
