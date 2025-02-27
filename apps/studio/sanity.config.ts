import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { actions, templates } from "./lib";
import { structure } from "./lib/structure";
import { schemas } from "./schemas";

export default defineConfig({
	name: "default",
	title: "Novo Holdings Annual Report 2024",
	projectId: "0ky4dmgz",
	dataset: "production",
	plugins: [
		structureTool({
			structure,
		}),
		visionTool(),
	],
	schema: {
		types: schemas,
		templates,
	},
	document: {
		actions,
	},
});
