import { Video } from "@carbon/icons-react";
import { defineField } from "sanity";

export default defineField({
	name: "video",
	type: "file",
	title: "Video",
	icon: Video,
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
	preview: {
		select: {
			filename: "asset.originalFilename",
			callToAction: "callToAction",
		},
		prepare({ filename, callToAction }) {
			return {
				title: "Video",
				subtitle: `${filename} ${callToAction ? `— (${callToAction})` : ""}`,
			};
		},
	},
});
