import type { APIRoute } from "astro";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import SVGSpriter from "svg-sprite";

const ICON_DIR = "../lib/svgs";

export const prerender = true;

export const GET: APIRoute = async () => {
	// create an `svg-sprite` instance
	const spriter = new SVGSpriter({ mode: { symbol: true } });

	// add all the svgs
	for (const svg of await readdir(ICON_DIR)) {
		const path = resolve(ICON_DIR, svg);
		spriter.add(
			path,
			svg,
			await readFile(path).then((file) => file.toString()),
		);
	}

	// compile the svgs into a sprite sheet
	const { result } = await spriter.compileAsync();

	// respond with the compiled svg
	const svg = result.symbol.sprite.contents;
	return new Response(svg, {
		headers: {
			"content-type": "image/svg+xml",
		},
	});
};
