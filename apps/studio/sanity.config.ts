import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { actions, templates } from "./lib";
import { structure } from "./lib/structure";
import { schemas } from "./schemas";

export default defineConfig({
	name: "default",
	title: "DFDS Route Map",

	projectId: "kava3hk0",
	dataset: "production",

	plugins: [structureTool({ structure }), visionTool()],

	schema: {
		types: schemas,
		templates,
	},
	document: {
		actions,
	},
});
