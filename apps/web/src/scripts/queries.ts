import type * as SanityTypes from "@novo-holdings-annual-report-2024/studio/types";
import { createGroqBuilder, makeSafeQueryRunner } from "groqd";
import { sanityClient } from "sanity:client";

export type SchemaConfig = {
	schemaTypes: SanityTypes.AllSanitySchemaTypes;
	referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo;
};

export const q = createGroqBuilder<SchemaConfig>();

export const runQuery = makeSafeQueryRunner((query) =>
	sanityClient.fetch(query),
);

const articleFigureModule = q
	.fragmentForType<"articleFigureModule">()
	.project(() => ({
		image: true,
	}));

const articleGalleryModule = q
	.fragmentForType<"articleGalleryModule">()
	.project(() => ({
		buttonText: true,
		caption: true,
		description: true,
		link: true,
		images: true,
	}));

const articleQuoteModule = q
	.fragmentForType<"articleQuoteModule">()
	.project(() => ({
		quote: true,
		author: true,
		image: true,
		jobTitle: true,
	}));

const articleStatsModule = q
	.fragmentForType<"articleStatsModule">()
	.project(() => ({
		stats: true,
		project: true,
		title: true,
	}));

const articleTextModule = q
	.fragmentForType<"articleTextModule">()
	.project(() => ({
		content: true,
	}));

const atAGlanceModule = q
	.fragmentForType<"atAGlanceModule">()
	.project((module) => ({
		title: true,
		animations: module.field("animations[]").project((animation) => ({
			lottie: animation.field("lottie").project((lottie) => ({
				asset: lottie
					.field("asset")
					.deref()
					.project((asset) => ({
						url: asset.field("url"),
					})),
			})),
		})),
	}));

const caseHighlightsModule = q
	.fragmentForType<"caseHighlightsModule">()
	.project((module) => ({
		title: true,
		cases: module
			.field("cases[]")
			.deref()
			.project(() => ({
				title: true,
				startDate: true,
				endDate: true,
				heroImage: true,
				project: true,
				slug: true,
			})),
	}));

const highlightsModule = q
	.fragmentForType<"highlightsModule">()
	.project(() => ({
		highlights: true,
		title: true,
	}));

const newsModule = q.fragmentForType<"newsModule">().project((module) => ({
	title: true,
	caption: true,
	description: true,
	video: module.field("video").project((video) => ({
		callToAction: true,
		thumbnail: true,
		asset: video
			.field("asset")
			.deref()
			.project((asset) => ({
				url: asset.field("url"),
			})),
	})),
}));

const sideBySideModule = q
	.fragmentForType<"sideBySideModule">()
	.project(() => ({
		buttonText: true,
		caption: true,
		description: true,
		link: true,
		title: true,
	}));

const pageModuleMap = {
	atAGlanceModule,
	highlightsModule,
	newsModule,
	sideBySideModule,
	caseHighlightsModule,
};

const caseModuleMap = {
	articleFigureModule,
	articleGalleryModule,
	articleQuoteModule,
	articleStatsModule,
	articleTextModule,
	caseHighlightsModule,
};

export const pagesQuery = q.star.filterByType("page").project((page) => ({
	title: true,
	slug: true,
	modules: page.field("modules[]").project((modules) => ({
		...modules.conditionalByType(pageModuleMap),
	})),
}));

export const caseQuery = q.star.filterByType("case").project((page) => ({
	title: true,
	slug: true,
	startDate: true,
	endDate: true,
	heroImage: true,
	project: true,
	modules: page.field("modules[]").project((modules) => ({
		...modules.conditionalByType(caseModuleMap),
	})),
}));

export const globalSettingsQuery = q.star
	.filterByType("globalSettings")
	.project((globalSettings) => ({
		globalTitle: true,
		logo: true,
		homePageSlug: globalSettings
			.field("homePage")
			.deref()
			.field("slug.current"),
	}));

export const pages = await runQuery(pagesQuery);
export const cases = await runQuery(caseQuery);
export const globalSettings = await runQuery(globalSettingsQuery);

export type GlobalSettings = (typeof globalSettings)[number];

export type Page = (typeof pages)[number];
export type Case = (typeof cases)[number];

export type PageModules = Page["modules"];
export type CaseModules = Case["modules"];

export type PageModule = NonNullable<PageModules>[number];
export type CaseModule = NonNullable<CaseModules>[number];

export type PageModuleProps<T extends PageModule["_type"]> = Extract<
	PageModule,
	{ _type: T }
>;
export type CaseModuleProps<T extends CaseModule["_type"]> = Extract<
	CaseModule,
	{ _type: T }
>;
