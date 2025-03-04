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

const linkFragment = q.fragmentForType<"link">().project((link) => ({
	external: true,
	mailto: true,
	tel: true,
	text: true,
	slug: link.field("page").deref().field("slug.current"),
}));

const buttonFragment = q.fragmentForType<"button">().project((button) => ({
	icon: button.field("icon"),
	link: button.field("link").project(linkFragment),
}));

const videoFragment = q.fragmentForType<"video">().project((video) => ({
	callToAction: true,
	thumbnail: true,
	src: video.field("asset").deref().field("url"),
}));

const articleFigureModule = q
	.fragmentForType<"articleFigureModule">()
	.project(() => ({
		image: true,
	}));

const articleGalleryModule = q
	.fragmentForType<"articleGalleryModule">()
	.project((module) => ({
		buttonText: true,
		caption: true,
		description: true,
		link: module.field("link").project(linkFragment),
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
			src: animation.field("lottie.asset").deref().field("url"),
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
				slug: "slug.current",
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
		src: video.field("asset").deref().field("url"),
	})),
}));

const sideBySideModule = q
	.fragmentForType<"sideBySideModule">()
	.project((module) => ({
		left: module.field("left[]").project((block) => ({
			...block.conditionalByType({
				block: {
					"...": true,
				},
				link: linkFragment,
				video: videoFragment,
				button: buttonFragment,
			}),
		})),
		right: module.field("right[]").project((block) => ({
			...block.conditionalByType({
				block: {
					"...": true,
				},
				link: linkFragment,
				video: videoFragment,
				button: buttonFragment,
			}),
		})),
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
	slug: "slug.current",
	modules: page.field("modules[]").project((modules) => ({
		...modules.conditionalByType(pageModuleMap),
	})),
}));

export const caseQuery = q.star.filterByType("case").project((page) => ({
	title: true,
	slug: "slug.current",
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
		homePageSlug: globalSettings
			.field("homePage")
			.deref()
			.field("slug.current"),
		header: globalSettings.field("header").project((header) => ({
			subtitle: true,
			subtitleLine2: true,
			callToAction: header.field("callToAction").project(linkFragment),
		})),
		footer: globalSettings.field("footer").project((footer) => ({
			copyright: true,
			backlink: footer.field("backlink").project(linkFragment),
			links: footer.field("links[]").project(linkFragment),
		})),
	}));

export const pages = runQuery(pagesQuery);
export const cases = runQuery(caseQuery);
export const globalSettings = runQuery(globalSettingsQuery);

export type GlobalSettings = Awaited<typeof globalSettings>[number];

export type Page = Awaited<typeof pages>[number];
export type Case = Awaited<typeof cases>[number];

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
