import { Glob } from "bun";
import { parseArgs } from "node:util";

function args() {
	const { values } = parseArgs({
		args: Bun.argv,
		options: {
			"output-file": {
				type: "string",
				short: "o",
			},
		},
		strict: false,
	});

	const inputDir = Bun.argv[2] || process.stdin.toString();

	if (!inputDir || !values["output-file"]) {
		console.error(
			"Input directory (as first argument or stdin) and -o (output file) flag are required",
		);
		process.exit(1);
	}

	return {
		inputDir,
		outputFile: values["output-file"],
	};
}

async function generateSvgTypes(
	inputDir: string,
	outputFile: string,
): Promise<void> {
	try {
		// Use Glob to scan for SVG files
		const glob = new Glob("*.svg");
		const svgFiles: string[] = [];

		for await (const file of glob.scan(inputDir)) {
			svgFiles.push(file);
		}

		const iconEntries = svgFiles
			.map((file) => {
				const typeName = file.replace(".svg", "").replace(/\s+/g, "--");
				return `"${typeName}"`;
			})
			.sort()
			.join(", ");

		// Read and write files using Bun.file() and Bun.write
		const existingContent = await Bun.file(outputFile).text();
		const updatedContent = existingContent.replace(
			/(?<=export const ICONS = \[)([\s\S]*?)(?=\])/,
			iconEntries,
		);
		await Bun.write(outputFile, updatedContent);

		console.log("Successfully updated Icon type definition");
	} catch (error) {
		console.error("Error generating Icon types:", error);
		process.exit(1);
	}
}

const { inputDir, outputFile } = args();
generateSvgTypes(inputDir, typeof outputFile === "string" ? outputFile : "");
