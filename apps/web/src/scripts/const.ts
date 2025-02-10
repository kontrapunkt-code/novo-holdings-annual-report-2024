import type { ValueAnimationTransition } from "motion";

export const GRID_SIZE = 0.1;

export const INITIAL_ZOOM = 3;
export const MIN_ZOOM = 4;
export const MAX_ZOOM = 10;

export const MAX_BOUNDS_PADDING = 15;

export const FONT_STACK = ["DFDS Sans Regular"];

export const COUNTRIES_DETAIL_LEVELS = [4, 8, 16] as const;

export const TOP_LAYER = "top-layer";
export const BG_LAYER = "background-layer";
export const BG_COUNTRY_LAYER = "countries-background-layer";
export const BG_COUNTRY_LABEL_LAYER = "country-labels-background-layer";
export const BG_ROUTE_LAYER = "routes-background-layer";
export const BG_LOCATION_LAYER = "locations-background-layer";

export const TRANSITION_OPTIONS: ValueAnimationTransition<number> = {
	duration: 0.6,
	ease: [0.3, 0.2, 0, 1],
};
