/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
	_type: "sanity.imagePaletteSwatch";
	background?: string;
	foreground?: string;
	population?: number;
	title?: string;
};

export type SanityImagePalette = {
	_type: "sanity.imagePalette";
	darkMuted?: SanityImagePaletteSwatch;
	lightVibrant?: SanityImagePaletteSwatch;
	darkVibrant?: SanityImagePaletteSwatch;
	vibrant?: SanityImagePaletteSwatch;
	dominant?: SanityImagePaletteSwatch;
	lightMuted?: SanityImagePaletteSwatch;
	muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
	_type: "sanity.imageDimensions";
	height?: number;
	width?: number;
	aspectRatio?: number;
};

export type Geopoint = {
	_type: "geopoint";
	lat?: number;
	lng?: number;
	alt?: number;
};

export type ArticleTextModule = {
	_type: "articleTextModule";
	content?: Array<{
		children?: Array<{
			marks?: Array<string>;
			text?: string;
			_type: "span";
			_key: string;
		}>;
		style?: "normal" | "h2" | "h3";
		listItem?: "bullet" | "number";
		markDefs?: Array<{
			href?: string;
			_type: "link";
			_key: string;
		}>;
		level?: number;
		_type: "block";
		_key: string;
	}>;
};

export type ArticleStatsModule = {
	_type: "articleStatsModule";
	project?: string;
	title?: string;
	stats?: Array<string>;
};

export type ArticleQuoteModule = {
	_type: "articleQuoteModule";
	quote?: string;
	author?: string;
	jobTitle?: string;
	image?: {
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		alt?: string;
		caption?: string;
		_type: "imageCombo";
	};
};

export type ArticleGalleryModule = {
	_type: "articleGalleryModule";
	caption?: string;
	description?: string;
	buttonText?: string;
	link?: string;
	images?: Array<{
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		alt?: string;
		caption?: string;
		_type: "imageCombo";
		_key: string;
	}>;
};

export type ArticleFigureModule = {
	_type: "articleFigureModule";
	image?: {
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		alt?: string;
		caption?: string;
		_type: "imageCombo";
	};
};

export type CaseHighlightsModule = {
	_type: "caseHighlightsModule";
	title?: string;
	cases?: Array<{
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		_key: string;
		[internalGroqTypeReferenceTo]?: "case";
	}>;
};

export type SideBySideModule = {
	_type: "sideBySideModule";
	caption?: string;
	title?: string;
	description?: string;
	buttonText?: string;
	link?: string;
};

export type NewsModule = {
	_type: "newsModule";
	caption?: string;
	title?: string;
	description?: string;
	video?: {
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.fileAsset";
		};
		callToAction?: string;
		thumbnail?: {
			asset?: {
				_ref: string;
				_type: "reference";
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
			};
			hotspot?: SanityImageHotspot;
			crop?: SanityImageCrop;
			alt?: string;
			caption?: string;
			_type: "imageCombo";
		};
		_type: "file";
	};
};

export type HighlightsModule = {
	_type: "highlightsModule";
	title?: string;
	highlights?: Array<{
		title?: string;
		description?: string;
		image?: {
			asset?: {
				_ref: string;
				_type: "reference";
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
			};
			hotspot?: SanityImageHotspot;
			crop?: SanityImageCrop;
			alt?: string;
			caption?: string;
			_type: "imageCombo";
		};
		link?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "page";
		};
		_key: string;
	}>;
};

export type AtAGlanceModule = {
	_type: "atAGlanceModule";
	title?: string;
	animations?: Array<{
		lottie?: {
			asset?: {
				_ref: string;
				_type: "reference";
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: "sanity.fileAsset";
			};
			_type: "file";
		};
		_key: string;
	}>;
};

export type Case = {
	_id: string;
	_type: "case";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	title?: string;
	slug?: Slug;
	project?: string;
	startDate?: string;
	endDate?: string;
	heroImage?: {
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		alt?: string;
		caption?: string;
		_type: "imageCombo";
	};
	modules?: Array<
		| ({
				_key: string;
		  } & ArticleTextModule)
		| ({
				_key: string;
		  } & ArticleQuoteModule)
		| ({
				_key: string;
		  } & ArticleStatsModule)
		| ({
				_key: string;
		  } & ArticleGalleryModule)
		| ({
				_key: string;
		  } & ArticleFigureModule)
		| ({
				_key: string;
		  } & CaseHighlightsModule)
	>;
};

export type SanityImageCrop = {
	_type: "sanity.imageCrop";
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};

export type SanityImageHotspot = {
	_type: "sanity.imageHotspot";
	x?: number;
	y?: number;
	height?: number;
	width?: number;
};

export type SanityImageAsset = {
	_id: string;
	_type: "sanity.imageAsset";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	metadata?: SanityImageMetadata;
	source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
	_type: "sanity.imageMetadata";
	location?: Geopoint;
	dimensions?: SanityImageDimensions;
	palette?: SanityImagePalette;
	lqip?: string;
	blurHash?: string;
	hasAlpha?: boolean;
	isOpaque?: boolean;
};

export type GlobalSettings = {
	_id: string;
	_type: "globalSettings";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	globalTitle?: string;
	logo?: {
		asset?: {
			_ref: string;
			_type: "reference";
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: "sanity.fileAsset";
		};
		_type: "file";
	};
	homePage?: {
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: "page";
	};
	loadingScreenTitle?: string;
	loadingScreenDescription?: string;
	loadingScreenButtonText?: string;
};

export type Page = {
	_id: string;
	_type: "page";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	title?: string;
	slug?: Slug;
	modules?: Array<
		| ({
				_key: string;
		  } & AtAGlanceModule)
		| ({
				_key: string;
		  } & HighlightsModule)
		| ({
				_key: string;
		  } & NewsModule)
		| ({
				_key: string;
		  } & SideBySideModule)
		| ({
				_key: string;
		  } & CaseHighlightsModule)
	>;
};

export type ImageCombo = {
	_type: "imageCombo";
	asset?: {
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
	};
	hotspot?: SanityImageHotspot;
	crop?: SanityImageCrop;
	alt?: string;
	caption?: string;
};

export type Slug = {
	_type: "slug";
	current?: string;
	source?: string;
};

export type SanityFileAsset = {
	_id: string;
	_type: "sanity.fileAsset";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
	_type: "sanity.assetSourceData";
	name?: string;
	id?: string;
	url?: string;
};

export type AllSanitySchemaTypes =
	| SanityImagePaletteSwatch
	| SanityImagePalette
	| SanityImageDimensions
	| Geopoint
	| ArticleTextModule
	| ArticleStatsModule
	| ArticleQuoteModule
	| ArticleGalleryModule
	| ArticleFigureModule
	| CaseHighlightsModule
	| SideBySideModule
	| NewsModule
	| HighlightsModule
	| AtAGlanceModule
	| Case
	| SanityImageCrop
	| SanityImageHotspot
	| SanityImageAsset
	| SanityImageMetadata
	| GlobalSettings
	| Page
	| ImageCombo
	| Slug
	| SanityFileAsset
	| SanityAssetSourceData;
export declare const internalGroqTypeReferenceTo: unique symbol;
