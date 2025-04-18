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

export type SideBySideModule = {
	_type: "sideBySideModule";
	left?: Array<
		| {
				children?: Array<{
					marks?: Array<string>;
					text?: string;
					_type: "span";
					_key: string;
				}>;
				style?: "normal" | "h2";
				listItem?: "bullet" | "number";
				markDefs?: Array<
					{
						_key: string;
					} & Link
				>;
				level?: number;
				_type: "block";
				_key: string;
		  }
		| ({
				_key: string;
		  } & Button)
		| {
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
				_type: "video";
				_key: string;
		  }
	>;
	right?: Array<
		| {
				children?: Array<{
					marks?: Array<string>;
					text?: string;
					_type: "span";
					_key: string;
				}>;
				style?: "normal" | "h2";
				listItem?: "bullet" | "number";
				markDefs?: Array<
					{
						_key: string;
					} & Link
				>;
				level?: number;
				_type: "block";
				_key: string;
		  }
		| ({
				_key: string;
		  } & Button)
		| {
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
				_type: "video";
				_key: string;
		  }
	>;
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
		link?: Link;
		_key: string;
	}>;
};

export type CaseHighlightsModule = {
	_type: "caseHighlightsModule";
	title?: string;
	cases?: Array<{
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		_key: string;
		[internalGroqTypeReferenceTo]?: "page";
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

export type ArticleTextModule = {
	_type: "articleTextModule";
	content?: Array<
		| {
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
		  }
		| ({
				_key: string;
		  } & Link)
	>;
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
	link?: Link;
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
	fullWidth?: boolean;
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

export type Video = {
	_type: "video";
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

export type Icon =
	| "arrow_back"
	| "arrow_forward"
	| "arrow_outward"
	| "close"
	| "download"
	| "logo"
	| "play_arrow";

export type GlobalSettings = {
	_id: string;
	_type: "globalSettings";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	globalTitle?: string;
	homePage?: {
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: "page";
	};
	header?: {
		subtitle?: string;
		subtitleLine2?: string;
		callToAction?: Link;
	};
	footer?: {
		copyright?: string;
		backlink?: Link;
		links?: Array<
			{
				_key: string;
			} & Link
		>;
	};
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
		  } & ArticleFigureModule)
		| ({
				_key: string;
		  } & ArticleGalleryModule)
		| ({
				_key: string;
		  } & ArticleQuoteModule)
		| ({
				_key: string;
		  } & ArticleStatsModule)
		| ({
				_key: string;
		  } & ArticleTextModule)
		| ({
				_key: string;
		  } & AtAGlanceModule)
		| ({
				_key: string;
		  } & CaseHighlightsModule)
		| ({
				_key: string;
		  } & HighlightsModule)
		| ({
				_key: string;
		  } & SideBySideModule)
	>;
	case?: {
		project?: string;
		subTitle?: string;
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
	};
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

export type Button = {
	_type: "button";
	icon?: Icon;
	link?: Link;
};

export type Link = {
	_type: "link";
	text?: string;
	page?: {
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: "page";
	};
	external?: string;
	mailto?: string;
	tel?: string;
};

export type MediaTag = {
	_id: string;
	_type: "media.tag";
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	name?: Slug;
};

export type Slug = {
	_type: "slug";
	current?: string;
	source?: string;
};

export type AllSanitySchemaTypes =
	| SanityImagePaletteSwatch
	| SanityImagePalette
	| SanityImageDimensions
	| Geopoint
	| SideBySideModule
	| HighlightsModule
	| CaseHighlightsModule
	| AtAGlanceModule
	| ArticleTextModule
	| ArticleStatsModule
	| ArticleQuoteModule
	| ArticleGalleryModule
	| ArticleFigureModule
	| Video
	| SanityImageCrop
	| SanityImageHotspot
	| SanityImageAsset
	| SanityImageMetadata
	| Icon
	| GlobalSettings
	| Page
	| ImageCombo
	| SanityFileAsset
	| SanityAssetSourceData
	| Button
	| Link
	| MediaTag
	| Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
