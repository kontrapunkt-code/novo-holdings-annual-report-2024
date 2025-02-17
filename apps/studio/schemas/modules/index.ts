import articleFigure from "./articleFigure";
import articleGallery from "./articleGallery";
import articleQuote from "./articleQuote";
import articleRelatedCases from "./articleRelatedCases";
import articleStats from "./articleStats";
import articleText from "./articleText";
import atAGlance from "./atAGlance";
import caseHighlights from "./caseHighlights";
import highlights from "./highlights";
import news from "./news";
import sideBySide from "./sideBySide";

// Export array of all modules for schema registration
export const modules = [
	atAGlance,
	articleText,
	articleQuote,
	articleStats,

	articleGallery,
	articleFigure,
	articleRelatedCases,
	sideBySide,
	highlights,
	news,
	caseHighlights,
];
