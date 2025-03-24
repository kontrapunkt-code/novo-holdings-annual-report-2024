import netlify from "@astrojs/netlify";
import solidJs from "@astrojs/solid-js";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import { browserslist } from "./package.json";

const esbuildTargets = browserslistToEsbuild(browserslist);
const lightningcssTargets = browserslistToTargets(browserslist);

// https://astro.build/config
export default defineConfig({
	server: {
		port: 8731,
	},
	output: "static",
	site: "https://novo-holdings-annual-report-2024.netlify.app/",
	devToolbar: {
		enabled: false,
	},
	adapter: netlify({
		edgeMiddleware: false,
	}),
	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: true,
	},
	image: {
		domains: ["cdn.sanity.io"],
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
		plugins: [tailwindcss()],
	},
	integrations: [
		solidJs(),
		sanity({
			projectId: "0ky4dmgz",
			dataset: "production",
			apiVersion: "2025-01-01",
			useCdn: false, // for static builds
		}),
	],
});
