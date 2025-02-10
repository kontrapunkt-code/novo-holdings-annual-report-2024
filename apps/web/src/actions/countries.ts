import countriesRaw from "@/data/countries-properties.geojson.json";
import { pipe } from "@/scripts/pipe";
import type { COUNTRIES } from "@dfds-route-map/lib/countries";
import { LOCATION_QUERY } from "@dfds-route-map/studio/queries";
import {
	center,
	distance,
	feature,
	featureCollection,
	flatten,
	point,
	polygonSmooth,
	truncate,
} from "@turf/turf";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type {
	Feature,
	FeatureCollection,
	MultiPolygon,
	Polygon,
	Position,
} from "geojson";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { sanityClient } from "sanity:client";

type Countries = FeatureCollection<
	Polygon | MultiPolygon,
	(typeof COUNTRIES.features)[number]["properties"]
>;

export const countries = defineAction({
	input: z.number(),
	handler: async (detail) => {
		const mapPipeline = pipe(
			// filter,
			simplify({ detail }),
			smooth({ iterations: 1 }),
			sort,
			removeDecimals({ precision: 3, coordinates: 2, mutate: true }),
			removeProperties(["sovereignt", "sov_a3", "iso_a3"]),
		);

		const countries = await mapPipeline(countriesRaw as Countries);

		return {
			json: countries,
			length: JSON.stringify(countries).length,
		};
	},
});

// async function filter({ features }: Countries) {
// 	const { countriesToExclude } = await sanityClient.fetch(COUNTRY_QUERY);
// 	return featureCollection(
// 		features.filter(
// 			(feature) => !countriesToExclude?.includes(feature.properties.sov_a3),
// 		),
// 	);
// }

function simplify(options: { detail: number }) {
	return async (countries: Countries) => {
		// Create temp directory if it doesn't exist
		const tempDir = join(process.cwd(), ".temp");
		await mkdir(tempDir, { recursive: true });

		// Create temporary input and output files
		const inputPath = join(tempDir, `input-${options.detail}.json`);
		const outputPath = join(tempDir, `output-${options.detail}.json`);

		// Write input GeoJSON to temp file
		await writeFile(inputPath, JSON.stringify(countries));

		// Run mapshaper CLI command
		await new Promise((resolve, reject) => {
			const process = spawn("npx", [
				"mapshaper",
				inputPath,
				"-simplify",
				"visvalingam",
				`${options.detail}%`,
				"keep-shapes",
				"-o",
				"format=geojson",
				outputPath,
			]);

			process.on("close", (code) => {
				if (code === 0) {
					resolve(code);
				} else {
					reject(new Error(`Mapshaper process exited with code ${code}`));
				}
			});

			process.on("error", reject);
		});

		// Read and parse the output file
		const output = await readFile(outputPath, "utf-8");

		// delete temp directory
		// await rm(tempDir, { recursive: true, force: true });

		return JSON.parse(output) as Countries;
	};
}

function smooth(options: { iterations?: number }) {
	return (countries: Countries) => polygonSmooth(countries, options);
}

async function sort(countries: Countries) {
	const locations = await sanityClient.fetch(LOCATION_QUERY);
	const centerPoint = center(locations);

	const shortestDistanceToCenter = (
		feature: Feature<Polygon | MultiPolygon>,
	) => {
		const reducer = (acc: Position[], curr: Feature<Polygon>) => {
			acc.push(curr.geometry.coordinates.flat(2));
			return acc;
		};

		const coordinates = flatten(feature).features.reduce(reducer, []);
		const distances = coordinates.map((c) => distance(centerPoint, point(c)));

		return Math.min(...distances);
	};

	return {
		type: countries.type,
		features: countries.features.sort(
			(a, b) => shortestDistanceToCenter(a) - shortestDistanceToCenter(b),
		),
	};
}

function removeDecimals(options: {
	precision?: number;
	coordinates?: number;
	mutate?: boolean;
}) {
	return (countries: Countries) => truncate(countries, options);
}

function removeProperties(keep: string[]) {
	return ({ features }: Countries) =>
		featureCollection(
			features.map((f) =>
				feature(
					f.geometry,
					Object.fromEntries(
						Object.entries(f.properties).filter(([key]) => keep.includes(key)),
					),
				),
			),
		);
}
