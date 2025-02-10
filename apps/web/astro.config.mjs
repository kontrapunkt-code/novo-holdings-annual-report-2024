import netlify from "@astrojs/netlify";
import solidJs from "@astrojs/solid-js";
import sanity from "@sanity/astro";
import { defineConfig, envField } from "astro/config";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import { browserslist } from "./package.json";

const esbuildTargets = browserslistToEsbuild(browserslist);
const lightningcssTargets = browserslistToTargets(browserslist);

// https://astro.build/config
export default defineConfig({
	server: {
		port: 2233,
	},
	output: "static",
	site: "https://dfds-route-map.netlify.app/",
	devToolbar: {
		enabled: false,
	},
	adapter: netlify({
		edgeMiddleware: false,
	}),
	image: {
		domains: ["cdn.sanity.io"],
	},
	env: {
		schema: {
			SANITY_STUDIO_TOKEN: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
		},
	},
	vite: {
		css: {
			transformer: "lightningcss",
			lightningcss: {
				targets: lightningcssTargets,
				minify: true,
			},
		},
		build: {
			cssMinify: "lightningcss",
			targets: esbuildTargets,
		},
	},
	integrations: [
		solidJs(),
		sanity({
			projectId: "kava3hk0",
			dataset: "production",
			apiVersion: "2025-01-01",
			useCdn: false, // for static builds
			token: import.meta.env.SANITY_STUDIO_TOKEN,
		}),
	],
});
