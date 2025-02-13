import type { PAGES_QUERYResult } from "@novo-holdings-annual-report-2024/studio/types";

// Core types from Sanity query
export type Page = PAGES_QUERYResult[number];
export type Module = NonNullable<Page["modules"]>[number];
export type ModuleProps<T extends Module["_type"]> = Extract<
	NonNullable<PAGES_QUERYResult[number]["modules"]>[number],
	{ _type: T }
>;

export type SanityImageType = ModuleProps<"articleFigureModule">["image"];

// Type guard for module type checking
export const isValidModuleType = <T extends Module["_type"]>(
	type: string,
	validTypes: readonly T[],
): type is T => validTypes.includes(type as T);
