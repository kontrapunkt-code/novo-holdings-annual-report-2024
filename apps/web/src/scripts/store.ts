import type {
	Center,
	Countries,
	CountryLabels,
	Cursor,
	FilterGroup,
	FilterGroups,
	GlobalSettings,
	Locations,
	MapGL,
	MaxBounds,
	Overlay,
	Routes,
} from "@/env";
import { INITIAL_ZOOM, MAX_ZOOM, MIN_ZOOM } from "@/scripts/const";
import { createStore } from "solid-js/store";

export const [store, setStore] = createStore({
	center: undefined as Center,
	countries: undefined as Countries,
	countryLabels: undefined as CountryLabels,
	cursor: "" as Cursor,
	filterGroups: undefined as FilterGroups,
	filterGroup: undefined as FilterGroup,
	globalSettings: undefined as GlobalSettings,
	hoverable: true,
	overlay: undefined as Overlay,
	overlayOn: false,
	locations: undefined as Locations,
	map: undefined as MapGL,
	maxBounds: undefined as MaxBounds,
	maxZoom: MAX_ZOOM,
	minZoom: MIN_ZOOM,
	routes: undefined as Routes,
	showOverlay: false,
	zoom: INITIAL_ZOOM,
});

const mql = window.matchMedia("(hover: hover)");
setStore({ hoverable: mql.matches });

mql.addEventListener("change", (e) => setStore({ hoverable: e.matches }));
