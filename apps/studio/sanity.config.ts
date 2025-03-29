import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import { media } from "sanity-plugin-media";
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
		media(),
		dashboardTool({
			widgets: [
				netlifyWidget({
					title: "Netlify Deploy",
					sites: [
						{
							apiId: "2948e21f-d78f-4356-9573-8b3b54fb7869",
							buildHookId: "67e7da086073b115b5ed2f7d",
							name: "novo-holdings-annual-report-2024",
							title: "Novo Holdings Annual Report 2024",
						},
					],
				}),
			],
		}),
	],
	schema: {
		types: schemas,
		templates,
	},
	document: {
		actions,
	},
});
