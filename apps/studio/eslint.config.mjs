import studio from "@sanity/eslint-config-studio";

export default [
	...studio,
	{
		ignores: [
			"dist",
			"node_modules",
			".sanity",
			".turbo",
			"typegen/sanity.types.ts",
		],
	},
];
