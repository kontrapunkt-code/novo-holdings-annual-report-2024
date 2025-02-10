/// <reference types="@sanity/astro/module" />

import type {
	FILTER_GROUP_QUERYResult,
	GLOBAL_SETTINGS_QUERYResult,
	LOCATION_QUERYResult,
	ROUTE_QUERYResult,
} from "@dfds-route-map/studio/types";
import type * as CSS from "csstype";
import type { Feature, FeatureCollection, Point } from "geojson";
import type { Map as MaplibreglMap } from "maplibre-gl";
import type { COUNTRIES_DETAIL_LEVELS } from "./scripts/const";

export type ActionResult<JSON> = {
	json: JSON;
	length: number;
};

export type StrictPosition = [x: number, y: number];

export type Center = Feature<Point> | undefined;
export type Countries = (typeof COUNTRIES_DETAIL_LEVELS)[number] | undefined;
export type CountryLabels =
	| FeatureCollection<Point, { iso_a2_eh: string }>
	| undefined;
export type Cursor = CSS.Properties["cursor"] | undefined;
export type FilterGroups = FILTER_GROUP_QUERYResult | undefined;
export type FilterGroup = FILTER_GROUP_QUERYResult[number] | undefined;
export type GlobalSettings = GLOBAL_SETTINGS_QUERYResult | undefined;
export type Overlay = HTMLButtonElement | undefined;
export type Locations = LOCATION_QUERYResult | undefined;
export type MapGL = MaplibreglMap | undefined;
export type MaxBounds = [number, number, number, number] | undefined;
export type Routes = ROUTE_QUERYResult | undefined;

interface CustomEventMap {
	"loader-data": CustomEvent<number>;
}

declare global {
	interface Window {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Window, ev: CustomEventMap[K]) => void,
			options?: boolean | AddEventListenerOptions,
		): void;
		removeEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Window, ev: CustomEventMap[K]) => void,
			options?: boolean | EventListenerOptions,
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(
			ev: CustomEventMap[K],
		): boolean;
	}
}
