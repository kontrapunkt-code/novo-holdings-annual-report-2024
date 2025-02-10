import type {
	PAGES_QUERYResult,
	GlobalSettings as SanityGlobalSettings,
} from "@novo-holdings-annual-report-2024/studio/types";

// Core types from Sanity query
export type Page = PAGES_QUERYResult[number];
export type Module = NonNullable<Page["modules"]>[number];

// Type guard for module type checking
export const isValidModuleType = <T extends Module["_type"]>(
	type: string,
	validTypes: readonly T[],
): type is T => validTypes.includes(type as T);

// Re-export specific module types for component props
export type HeroModule = Extract<Module, { _type: "heroModule" }>;
export type TextModule = Extract<Module, { _type: "textModule" }>;
export type ImageModule = Extract<Module, { _type: "imageModule" }>;

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
