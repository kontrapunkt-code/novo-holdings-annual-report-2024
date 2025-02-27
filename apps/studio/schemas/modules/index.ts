import articleFigure from "./article-figure";
import articleGallery from "./article-gallery";
import articleQuote from "./article-quote";
import articleStats from "./article-stats";
import articleText from "./article-text";
import atAGlance from "./at-a-glance";
import caseHighlights from "./case-highlights";
import highlights from "./highlights";
import news from "./news";
import sideBySide from "./side-by-side";

// Export array of all modules for schema registration
export const modules = [
	atAGlance,
	articleText,
	articleQuote,
	articleStats,
	articleGallery,
	articleFigure,
	sideBySide,
	highlights,
	news,
	caseHighlights,
];
