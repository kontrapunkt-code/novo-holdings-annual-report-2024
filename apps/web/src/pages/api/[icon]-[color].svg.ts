import { ICONS } from "@dfds-route-map/lib";
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ICON_DIR = "../lib/svgs";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () => {
	return ICONS.map((icon) => ({
		params: { icon, color: "white" },
	}));
};

export const GET: APIRoute = async ({ params }) => {
	try {
		if (!params.icon) {
			throw new Error("Icon name is required");
		}

		const svgPath = resolve(ICON_DIR, `${params.icon}.svg`);
		const svgBuffer = await readFile(svgPath);
		const svg = svgBuffer.toString();
		const svgWithColor = svg.replace(
			/currentcolor/g,
			params.color ?? "currentcolor",
		);

		return new Response(svgWithColor, {
			headers: {
				"content-type": "image/svg+xml",
				"Cache-Control": "public, max-age=31536000", // Cache for 1 year
			},
		});
	} catch (error) {
		console.error("Error converting SVG to PNG:", error);
		return new Response("Icon not found", { status: 404 });
	}
};
