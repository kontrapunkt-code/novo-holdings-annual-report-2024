import netlify from "@astrojs/netlify";
import solidJs from "@astrojs/solid-js";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
	image: {
		domains: ["cdn.sanity.io"],
	},
	vite: {
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
