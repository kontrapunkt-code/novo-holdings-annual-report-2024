import { AttributionControl } from "@/components/maplibre/attribution-control";
import { MapGL } from "@/components/maplibre/map-gl";
import { Cursor } from "@/components/solid/cursor";
import { FilterGroups } from "@/components/solid/filter-groups";
import { LayerOrder } from "@/components/solid/layer-order";
import { LegendControls } from "@/components/solid/legend-control";
import { ZoomControls } from "@/components/solid/zoom-controls";
import type {
	ActionResult,
	Center,
	CountryLabels,
	FilterGroups as FilterGroupsType,
	GlobalSettings,
	Locations,
	MaxBounds,
	Routes,
} from "@/env";
import { INITIAL_ZOOM, MAX_BOUNDS_PADDING, MAX_ZOOM } from "@/scripts/const";
import { setStore, store } from "@/scripts/store";
import "@/styles/focus.css";
import "@/styles/map.css";
import type { LngLatLike, MapEventType, MapOptions } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cubicBezier } from "motion";
import {
	type VoidComponent,
	createEffect,
	createResource,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";

export const RouteMap: VoidComponent = () => {
	let container: HTMLDivElement | undefined;

	onMount(() => {
		window.addEventListener("map-entrance", mapEntrance);
	});

	onCleanup(() => {
		window.removeEventListener("map-entrance", mapEntrance);
	});

	const mapEntrance = async () => {
		const map = store.map;
		if (!map || !store.maxBounds) return;

		const paddedMaxBounds = [
			store.maxBounds[0] - MAX_BOUNDS_PADDING,
			store.maxBounds[1] - MAX_BOUNDS_PADDING,
			store.maxBounds[2] + MAX_BOUNDS_PADDING,
			store.maxBounds[3] + MAX_BOUNDS_PADDING,
		] satisfies MaxBounds;

		map.setMaxBounds(paddedMaxBounds);
		map.fitBounds(store.maxBounds, {
			duration: 0,
			padding: 32,
		});

		// Get zoom after fitBounds
		const zoom = map.getZoom();
		map.setMaxBounds(null);

		// Zoom out to animate in
		map.zoomTo(zoom - 1, { duration: 0 });

		await new Promise((resolve) => setTimeout(resolve, 300));

		// Animate zoom in
		map.zoomTo(zoom, {
			duration: 1200,
			easing: cubicBezier(0.09, 0.41, 0.19, 1),
		});

		await new Promise((resolve) => setTimeout(resolve, 1200));

		// Set max bounds after zoom in finished
		map.setMaxBounds(paddedMaxBounds);
		map.setMaxZoom(MAX_ZOOM);
	};

	const loaderData = (size: number) => {
		window.dispatchEvent(new CustomEvent("loader-data", { detail: size }));
	};

	createResource(async () => {
		const globalSettingsResponse = await fetch("/api/global-settings.json");
		const globalSettings: ActionResult<GlobalSettings> =
			await globalSettingsResponse.json();
		loaderData(globalSettings.length);

		const filterGroupsResponse = await fetch("/api/filter-groups.json");
		const filterGroups: ActionResult<FilterGroupsType> =
			await filterGroupsResponse.json();
		loaderData(filterGroups.length);

		const routesResponse = await fetch("/api/routes.geojson");
		const routes: ActionResult<Routes> = await routesResponse.json();
		loaderData(routes.length);

		const locationsResponse = await fetch("/api/locations.geojson");
		const locations: ActionResult<Locations> = await locationsResponse.json();
		loaderData(locations.length);

		const countryLabelsResponse = await fetch("/api/country-labels.geojson");
		const countryLabels: ActionResult<CountryLabels> =
			await countryLabelsResponse.json();
		loaderData(countryLabels.length);

		const centerResponse = await fetch("/api/center.geojson");
		const center: ActionResult<Center> = await centerResponse.json();
		loaderData(center.length);

		const maxBoundsResponse = await fetch("/api/max-bounds.json");
		const maxBounds: ActionResult<MaxBounds> = await maxBoundsResponse.json();
		loaderData(maxBounds.length);

		if (
			!globalSettings
			|| !filterGroups
			|| !routes
			|| !locations
			|| !center
			|| !maxBounds
		)
			throw new Error("Failed to load data");

		setStore({
			globalSettings: globalSettings.json,
			filterGroups: filterGroups.json,
			routes: routes.json,
			locations: locations.json,
			countryLabels: countryLabels.json,
			center: center.json,
			maxBounds: maxBounds.json,
		});
	});

	const [mapOptions, setMapOptions] = createSignal<MapOptions>();

	createEffect(() => {
		if (!container || !store.center) return;

		setMapOptions({
			container,
			style: {
				version: 8,
				sources: {},
				layers: [],
				glyphs: `${window.location.origin}/fonts/{fontstack}/{range}.pbf`,
				transition: {
					duration: 0,
					delay: 0,
				},
			},
			center: store.center?.geometry?.coordinates as LngLatLike | undefined,
			zoom: INITIAL_ZOOM,
			dragRotate: false,
			hash: false,
			attributionControl: false,
			fadeDuration: 0,
			touchPitch: false,
			boxZoom: false,
		});
	});

	const load = (event: MapEventType["load"]) => {
		setStore({ map: event.target });
	};

	return (
		<>
			<LayerOrder />
			<div id="maplibregl" ref={container} />
			<MapGL mapOptions={mapOptions()} events={{ load }} />
			<AttributionControl
				options={{
					customAttribution: `<a href="https://maplibre.org/" target="_blank" rel="noopener noreferrer">MapLibre</a>`,
					compact: false,
				}}
				position="bottom-left"
			/>
			<ZoomControls />
			<LegendControls />
			<div id="ui">
				<FilterGroups />
				<Cursor />
			</div>
		</>
	);
};
