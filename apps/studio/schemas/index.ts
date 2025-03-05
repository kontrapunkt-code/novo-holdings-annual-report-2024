import button from "./button";
import case_ from "./case";
import globalSettings from "./global-settings";
import icon from "./icon";
import imageCombo from "./image-combo";
import link from "./link";
import articleFigure from "./modules/article-figure";
import articleGallery from "./modules/article-gallery";
import articleQuote from "./modules/article-quote";
import articleStats from "./modules/article-stats";
import articleText from "./modules/article-text";
import atAGlance from "./modules/at-a-glance";
import caseHighlights from "./modules/case-highlights";
import highlights from "./modules/highlights";
import news from "./modules/news";
import sideBySide from "./modules/side-by-side";
import page from "./page";
import video from "./video";

export const schemas = [
	globalSettings,
	page,
	imageCombo,
	case_,
	link,
	video,
	button,
	icon,

	// Modules
	atAGlance,
	highlights,
	news,
	sideBySide,
	caseHighlights,
	articleFigure,
	articleGallery,
	articleQuote,
	articleStats,
	articleText,
];
