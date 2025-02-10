import { GeoJSONSource } from "@/components/maplibre/geojson-source";
import { Layer } from "@/components/maplibre/layer";
import type { FilterGroup, Routes as RoutesType } from "@/env";
import { BG_ROUTE_LAYER, MAX_ZOOM, TRANSITION_OPTIONS } from "@/scripts/const";
import { springEasing } from "@/scripts/eases";
import { rafThrottle } from "@/scripts/raf-throttle";
import { store } from "@/scripts/store";
import { COLORS } from "@dfds-route-map/lib";
import { along, bbox, length, lineSlice, lineString, point } from "@turf/turf";
import type {
	GeoJSONSourceSpecification,
	MapLayerEventType,
} from "maplibre-gl";
import { animate } from "motion";
import {
	type VoidComponent,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import { Portal } from "solid-js/web";

export const ROUTES_SOURCE = "routes_source";
export const FERRY_ROUTES = "ferry_routes";
export const FERRY_ROUTES_HOVER = "ferry_routes_hover";
export const RAIL_ROUTES = "rail_routes";
export const RAIL_ROUTES_HOVER = "rail_routes_hover";

const LINE_WIDTH = 0.5;

export type RouteFeature = NonNullable<RoutesType>["features"][number];
export type RouteProperties = RouteFeature["properties"];

const emptySource: GeoJSONSourceSpecification = {
	type: "geojson",
	data: {
		type: "FeatureCollection",
		features: [],
	},
	generateId: true,
};

export const Routes: VoidComponent = () => {
	let parent: HTMLDivElement | undefined;
	let tooltip: HTMLDivElement | undefined;
	let text: HTMLParagraphElement | undefined;

	const [activeProperties, setActiveProperties] =
		createSignal<RouteProperties>();
	const [source, setSource] = createSignal(emptySource);

	const routeTitle = createMemo<string>(() => {
		const map = store.map;
		if (!map || !parent || !text) return "";

		const l1 = store.locations?.features?.find(
			(location) => location.properties.id === activeProperties()?.start,
		);
		const l2 = store.locations?.features?.find(
			(location) => location.properties.id === activeProperties()?.end,
		);

		if (!l1 || !l2) return "";

		return `${l1.properties.location} — ${l2.properties.location}`;
	});

	onMount(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("map-entrance", mapEntrance);
	});

	onCleanup(() => {
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("map-entrance", mapEntrance);
	});

	const mapEntrance = async () => {
		animateRoutes([], [], { duration: 0 });

		await new Promise((resolve) => setTimeout(resolve, 300));

		animateRoutes(
			[],
			store.routes?.features.map((feature) => feature.properties.id) ?? [],
			{
				duration: 1.2,
				ease: [0.09, 0.41, 0.19, 1],
				delay: 0.2,
			},
		);
	};

	const handleMouseMove = rafThrottle((event: MouseEvent) => {
		if (!parent) return;

		animate(
			parent,
			{
				left: event.clientX,
				top: event.clientY,
			},
			{
				type: "spring",
				visualDuration: 0.2,
				bounce: 0.2,
			},
		);
	});

	const mouseenter = (event: MapLayerEventType["mouseenter"]) => {
		const map = store.map;
		if (!map || !tooltip || !text) return;

		const allFeatures = map.querySourceFeatures(ROUTES_SOURCE);
		const activeId = event.features?.[0]?.id;
		if (!activeId) return;

		setActiveProperties(
			event.features?.[0]?.properties as RouteProperties | undefined,
		);

		for (const feature of allFeatures) {
			if (feature.id !== activeId) continue;
			map.setFeatureState(
				{ source: ROUTES_SOURCE, id: feature.id },
				{ hover: true },
			);
		}

		if (!activeProperties() || store.overlayOn) return;

		animate(
			tooltip,
			{
				width: text.clientWidth + 32,
				height: "2rem",
				opacity: 1,
				backgroundColor: COLORS.DEEP_BLUE,
			},
			{
				type: "spring",
				visualDuration: 0.2,
				bounce: 0.1,
			},
		);

		animate(
			text,
			{
				opacity: 1,
				scale: 1,
			},
			{
				type: "spring",
				visualDuration: 0.2,
				bounce: 0.1,
			},
		);
	};

	const mouseleave = () => {
		const map = store.map;
		if (!map || !tooltip || !text) return;

		setActiveProperties();

		animate(
			tooltip,
			{
				width: "1rem",
				height: "1rem",
				opacity: 0,
				backgroundColor: COLORS.SEA_BLUE,
			},
			{
				type: "spring",
				visualDuration: 0.2,
				bounce: 0.1,
			},
		);

		animate(
			text,
			{
				opacity: 0,
				scale: 0.5,
			},
			{
				type: "spring",
				visualDuration: 0.2,
				bounce: 0.1,
			},
		);

		const allFeatures = map.querySourceFeatures(ROUTES_SOURCE);
		for (const feature of allFeatures) {
			map.setFeatureState(
				{ source: ROUTES_SOURCE, id: feature.id },
				{ hover: false },
			);
		}
	};

	const click = (event: MapLayerEventType["click"]) => {
		const map = store.map;
		const id = event.features?.[0]?.properties.id;
		const feature = store.routes?.features.find(
			(feature) => feature.properties.id === id,
		);
		if (!map || !feature) return;

		const bounds = bbox({
			type: "LineString",
			coordinates: feature.geometry.coordinates,
		});

		if (bounds.length !== 4) return;
		map.fitBounds(bounds, {
			padding: 128,
			duration: 600,
			easing: springEasing(600, 0.16),
		});
	};

	createEffect<FilterGroup>((previousFilterGroup) => {
		const filter = (filterGroup: FilterGroup) => (feature: RouteFeature) =>
			!filterGroup
			|| feature.properties.filter_groups?.some(
				(_id) => filterGroup?._id === _id,
			);

		const wasActiveIds =
			store.routes?.features
				?.filter(filter(previousFilterGroup))
				.map((feature) => feature.properties.id) ?? [];

		const isActiveIds =
			store.routes?.features
				?.filter(filter(store.filterGroup))
				.map((feature) => feature.properties.id) ?? [];

		animateRoutes(wasActiveIds, isActiveIds);

		return store.filterGroup;
	}, store.filterGroup);

	const animateRoutes = (
		wasActiveIds: string[],
		isActiveIds: string[],
		options = TRANSITION_OPTIONS,
	) => {
		return animate(0, 1, {
			...options,
			onUpdate(progress) {
				setSource({
					...source(),
					data: {
						type: "FeatureCollection",
						features:
							store.routes?.features.map((feature) => {
								const wasActive = wasActiveIds.includes(feature.properties.id);
								const isActive = isActiveIds.includes(feature.properties.id);

								// If route was active and is still active, return the same line string
								if (wasActive && isActive) {
									return feature;
								}

								// If route wasn't active and isn't active, return an empty line string
								if (!wasActive && !isActive) {
									return lineString([
										[0, 0],
										[0, 0],
									]);
								}

								// Index is start of line if route has service, end if route doesn't have service
								const index = isActive ? 0 : -1;
								const originPoint = point(
									feature.geometry.coordinates.at(index) ?? [0, 0],
									feature.properties,
								);

								// Animate the route by drawing from start to end
								// If origin point is start it will animated in, if it is end it will animated out
								const progressPoint = along(
									feature,
									length(feature) * progress,
								);

								// Slice the line at the progress point
								return lineSlice(originPoint, progressPoint, feature);
							}) ?? [],
					},
				});
			},
		});
	};

	return (
		<>
			<GeoJSONSource id={ROUTES_SOURCE} source={source()}>
				{/* Hover routes */}
				<Layer
					beforeId={BG_ROUTE_LAYER}
					layer={{
						id: FERRY_ROUTES_HOVER,
						source: ROUTES_SOURCE,
						type: "line",
						paint: {
							"line-color": COLORS.RED,
							"line-width": [
								"interpolate",
								["exponential", 2],
								["zoom"],
								0,
								["*", 0.15, ["^", 2, 0]],
								24,
								["*", 0.15, ["^", 2, 24]],
							],
							"line-opacity": 0,
						},
					}}
					events={{
						...(store.hoverable && {
							mouseenter,
							mouseleave,
							click,
						}),
					}}
				/>

				{/* Ferry routes */}
				<Layer
					beforeId={BG_ROUTE_LAYER}
					layer={{
						id: FERRY_ROUTES,
						source: ROUTES_SOURCE,
						type: "line",
						filter: ["==", ["get", "type"], "ferry"],
						layout: {
							"line-cap": "round",
							"line-join": "round",
						},
						paint: {
							"line-color": [
								"case",
								["boolean", ["feature-state", "hover"], false],
								COLORS.DEEP_BLUE,
								COLORS.SEA_BLUE,
							],
							"line-width": [
								"interpolate",
								["exponential", 1],
								["zoom"],
								0,
								0,
								MAX_ZOOM,
								[
									"*",
									MAX_ZOOM * LINE_WIDTH,
									[
										"case",
										["boolean", ["feature-state", "hover"], false],
										2,
										1,
									],
								],
							],
						},
					}}
				/>

				{/* Rail routes */}
				<Layer
					beforeId={BG_ROUTE_LAYER}
					layer={{
						id: RAIL_ROUTES,
						source: ROUTES_SOURCE,
						type: "line",
						filter: ["==", ["get", "type"], "rail"],
						layout: {
							"line-join": "round",
						},
						paint: {
							"line-dasharray": [3, 1.5],
							"line-color": [
								"case",
								["boolean", ["feature-state", "hover"], false],
								COLORS.DEEP_BLUE,
								COLORS.SEA_BLUE,
							],
							"line-width": [
								"interpolate",
								["exponential", 1],
								["zoom"],
								0,
								0,
								MAX_ZOOM,
								[
									"*",
									MAX_ZOOM * LINE_WIDTH,
									[
										"case",
										["boolean", ["feature-state", "hover"], false],
										2,
										1,
									],
								],
							],
						},
					}}
				/>
			</GeoJSONSource>
			<Portal mount={document.querySelector("#ui") ?? undefined}>
				<div class="route-tooltip-parent" ref={parent}>
					<div class="route-tooltip" ref={tooltip}>
						<p ref={text}>{routeTitle()}</p>
					</div>
				</div>
			</Portal>
		</>
	);
};
