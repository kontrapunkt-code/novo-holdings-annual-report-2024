import { Location } from "@carbon/icons-react";
import { CATEGORY_ICONS } from "@dfds-route-map/lib";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "location",
	title: "Location",
	type: "document",
	icon: Location,
	fields: [
		defineField({
			name: "geopoint",
			title: "Geopoint",
			type: "geopoint",
			readOnly: true,
		}),
		defineField({
			name: "location",
			title: "Location",
			type: "string",
		}),
		defineField({
			name: "filterGroups",
			title: "Filter Groups",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "filterGroup" }],
				}),
			],
		}),
		defineField({
			name: "isStory",
			title: "Is story?",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			hidden: ({ parent }) => !parent?.isStory,
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			hidden: ({ parent }) => !parent?.isStory,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 6,
			hidden: ({ parent }) => !parent?.isStory,
		}),
		defineField({
			name: "isFeaturedStory",
			title: "Is featured story?",
			type: "boolean",
			initialValue: false,
			hidden: ({ parent }) => !parent?.isStory,
		}),
		defineField({
			name: "link",
			title: "Link",
			type: "object",
			hidden: ({ parent }) => !parent?.isStory || !parent?.isFeaturedStory,
			fields: [
				defineField({
					name: "title",
					title: "Title",
					type: "string",
					initialValue: "Read more",
				}),
				defineField({
					name: "url",
					title: "URL",
					type: "url",
				}),
			],
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "object",
			hidden: ({ parent }) => !parent?.isStory || !parent?.isFeaturedStory,
			fields: [
				defineField({
					name: "title",
					title: "Title",
					type: "string",
					options: {
						list: CATEGORY_ICONS.map((i) => i.title),
					},
					initialValue: "Logistics solutions",
				}),
				defineField({
					name: "icon",
					title: "Icon",
					type: "string",
					options: {
						list: CATEGORY_ICONS,
					},
					initialValue: "logistics_solutions",
				}),
			],
		}),
		defineField({
			name: "services",
			title: "Services",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "service" }],
					options: {
						filter: "category == 'Location'",
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			location: "location",
			title: "title",
			image: "image",
		},
		prepare: ({ location, title, image }) => ({
			title: location || "Location",
			subtitle: title,
			media: image,
		}),
	},
});
