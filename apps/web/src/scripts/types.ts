import type {
	PAGES_QUERYResult,
	GlobalSettings as SanityGlobalSettings,
} from "@novo-holdings-annual-report-2024/studio/types";
import type { ImageAsset, PortableTextBlock } from "@sanity/types";

// Core types from Sanity query
export type Page = PAGES_QUERYResult[number];
export type Module = NonNullable<Page["modules"]>[number];

// Common types
export type SanityImage = {
	_type: "image";
	asset?: ImageAsset;
	hotspot?: { x: number; y: number };
	crop?: { top: number; right: number; bottom: number; left: number };
};

export type PageReference = {
	_type: "reference";
	_ref: string;
	slug: string;
};

// Type guard for module type checking
export const isValidModuleType = <T extends Module["_type"]>(
	type: string,
	validTypes: readonly T[],
): type is T => validTypes.includes(type as T);

// Re-export specific module types for component props
export type HeroModule = Extract<Module, { _type: "heroModule" }>;
export type TextModule = Extract<Module, { _type: "textModule" }>;
export type ImageModule = Extract<Module, { _type: "imageModule" }>;

export type AtAGlanceModule = Extract<Module, { _type: "atAGlanceModule" }> & {
	items: Array<{
		label: string;
		value: string;
	}>;
};

export type NewsModule = Extract<Module, { _type: "newsModule" }> & {
	newsItems: Array<{
		title: string;
		date: string;
		excerpt: string;
		image: SanityImage;
		link: string;
	}>;
};

export type CaseHighlightsModule = Extract<
	Module,
	{ _type: "caseHighlightsModule" }
> & {
	cases: Array<{
		title: string;
		description: string;
		period: string;
		image: SanityImage;
		link: PageReference;
		featured: boolean;
	}>;
};

export type SideBySideModule = Extract<
	Module,
	{ _type: "sideBySideModule" }
> & {
	leftContent: PortableTextBlock[];
	rightContent: PortableTextBlock[];
	image: SanityImage;
	imagePosition: "left" | "right";
};

export type HighlightsModule = Extract<
	Module,
	{ _type: "highlightsModule" }
> & {
	highlights: Array<{
		title: string;
		description: string;
		image: SanityImage;
		link: PageReference;
	}>;
};

export type ArticleHeroModule = Extract<
	Module,
	{ _type: "articleHeroModule" }
> & {
	image: SanityImage;
};

export type ArticleTextModule = Extract<
	Module,
	{ _type: "articleTextModule" }
> & {
	content: PortableTextBlock[];
};

export type ArticleFigureModule = Extract<
	Module,
	{ _type: "articleFigureModule" }
> & {
	image: SanityImage;
	width: "full" | "medium" | "small";
};

export type ArticleQuoteModule = Extract<
	Module,
	{ _type: "articleQuoteModule" }
>;

export type ArticleStatsModule = Extract<
	Module,
	{ _type: "articleStatsModule" }
> & {
	stats: Array<{
		value: string;
		label: string;
		description?: string;
	}>;
};

export type ArticleRelatedCasesModule = Extract<
	Module,
	{ _type: "articleRelatedCasesModule" }
> & {
	cases: Array<PageReference & { title: string }>;
};

export type ArticleGalleryModule = Extract<
	Module,
	{ _type: "articleGalleryModule" }
> & {
	images: Array<
		SanityImage & {
			caption?: string;
			alt?: string;
		}
	>;
};

// Settings type with proper image handling
export type GlobalSettings = Omit<SanityGlobalSettings, "logo" | "homePage"> & {
	logo?: {
		asset: {
			url: string;
		};
	};
	homePage: {
		_ref: string;
		_type: "reference";
		slug: string;
	};
};
