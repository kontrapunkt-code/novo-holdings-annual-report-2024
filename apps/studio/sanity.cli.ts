import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
	api: {
		projectId: "0ky4dmgz",
		dataset: "production",
	},
	/**
	 * Enable auto-updates for studios.
	 * Learn more at https://www.sanity.io/docs/cli#auto-updates
	 */
	autoUpdates: true,
	// studioHost: "novo-holdings-annual-report-2024",
});
