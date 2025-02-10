import { GeoJSONSource } from "@/components/maplibre/geojson-source";
import { Layer } from "@/components/maplibre/layer";
import { Marker } from "@/components/maplibre/marker";
import { SearchBox } from "@/components/solid/search-box";
import { UpdateButton } from "@/components/solid/update-button";
import type { Routes, StrictPosition } from "@/env";
import { isValidAngle, mapSnap } from "@/scripts/map-snap";
import { store } from "@/scripts/store";
import { COLORS } from "@dfds-route-map/lib";
import type { Geopoint } from "@dfds-route-map/studio/types";
import { lineString } from "@turf/turf";
import { actions } from "astro:actions";
import type { Feature, LineString } from "geojson";
import { LngLat, type Marker as MaplibreMarker } from "maplibre-gl";
import {
	type Accessor,
	type Component,
	For,
	type Setter,
	createEffect,
	createMemo,
	createResource,
	createSignal,
} from "solid-js";
import { Icon } from "./icon";

type Route = NonNullable<Routes>["features"][number];

type RouteUpdate = {
	_id?: string;
	lngLats?: LngLat[];
};

type Waypoint = {
	id: string;
	lngLat: LngLat;
	marker: Accessor<MaplibreMarker | undefined>;
	setMarker: Setter<MaplibreMarker | undefined>;
};

type PreviewProperties = {
	id: string;
	is_valid_angle: boolean;
};

type PreviewLine = Feature<LineString, PreviewProperties>;

export const EditRoute: Component = () => {
	let indexRef: HTMLInputElement | undefined;

	const [routeTitle, setRouteTitle] = createSignal<string>();
	const [routeUpdate, setRouteUpdate] = createSignal<RouteUpdate>();
	const [initialWaypoints, setInitalWaypoints] = createSignal<Waypoint[]>([]);
	const [previewWaypoints, setPreviewWaypoints] = createSignal<Waypoint[]>([]);

	const items = createMemo<string[]>(
		() =>
			store.routes?.features.map((route) => route.properties.location ?? "")
			?? [],
	);

	const route = createMemo<Route | undefined>(() =>
		store.routes?.features.find(
			(route) => route.properties.location === routeTitle(),
		),
	);

	const routePreview = createMemo<PreviewLine[] | undefined>(() => {
		const coordinates = route()?.geometry.coordinates as
			| StrictPosition[]
			| undefined;
		if (!coordinates) return;

		const start = coordinates[0];
		const end = coordinates.at(-1);
		if (!start || !end) return;

		const middle: StrictPosition[] =
			previewWaypoints().map((w) => [w.lngLat.lng, w.lngLat.lat])
			?? coordinates.slice(1, -1);

		// Get all points in order: start -> waypoints -> end
		const allPoints = [start, ...middle, end];

		// Create pairs of consecutive points
		const segments: Feature<LineString, PreviewProperties>[] = [];
		for (let i = 0; i < allPoints.length - 1; i++) {
			const p1 = allPoints[i];
			const p2 = allPoints[i + 1];
			if (!p1 || !p2) continue;
			segments.push(
				lineString([p1, p2], {
					id: `route-preview-${i}`,
					is_valid_angle: isValidAngle(p1, p2),
				}),
			);
		}

		return segments;
	});

	const [status, { mutate }] = createResource(
		routeUpdate,
		async (routeUpdate) => {
			const password = localStorage.getItem("SANITY_STUDIO_PASSWORD");
			const _id = routeUpdate._id;
			const waypoints: Geopoint[] | undefined = routeUpdate?.lngLats?.map(
				({ lng, lat }) => ({ _type: "geopoint", lng, lat }),
			);

			if (!waypoints || !_id || !password) {
				throw new Error("Invalid location update");
			}

			await actions.updateRoute({ _id, password, waypoints });

			// Reset status after 2 seconds
			setTimeout(mutate, 2000);

			return true;
		},
	);

	const updateRoute = () => {
		setRouteUpdate({
			_id: route()?.properties.id,
			lngLats: previewWaypoints().map((w) => w.lngLat) ?? [],
		});
	};

	const updateWaypoints = (waypoints: Waypoint[]) => {
		setInitalWaypoints(waypoints);
		setPreviewWaypoints(waypoints);
	};

	const pushWaypoint = () => {
		const map = store.map;
		if (!map) return;

		const snappedLngLat = mapSnap(map, map.getCenter());
		const [marker, setMarker] = createSignal<MaplibreMarker>();
		const newWaypoints = [
			...(previewWaypoints() ?? []),
			{
				id: window.crypto.randomUUID(),
				lngLat: snappedLngLat,
				marker,
				setMarker,
			},
		];

		updateWaypoints(newWaypoints);
	};

	const unshiftWaypoint = () => {
		const map = store.map;
		if (!map) return;

		const snappedLngLat = mapSnap(map, map.getCenter());
		const [marker, setMarker] = createSignal<MaplibreMarker>();
		const newWaypoints = [
			{
				id: window.crypto.randomUUID(),
				lngLat: snappedLngLat,
				marker,
				setMarker,
			},
			...(previewWaypoints() ?? []),
		];

		updateWaypoints(newWaypoints);
	};

	const shiftWaypoint = () => {
		const newWaypoints = previewWaypoints().slice(1);
		if (!newWaypoints) return;

		updateWaypoints(newWaypoints);
	};

	const popWaypoint = () => {
		const newWaypoints = previewWaypoints().slice(0, -1);
		if (!newWaypoints) return;

		updateWaypoints(newWaypoints);
	};

	const addIndexWaypoint = () => {
		const map = store.map;
		if (!map) return;

		const index = Math.floor(indexRef?.valueAsNumber ?? 0);
		const snappedLngLat = mapSnap(map, map.getCenter());
		const [marker, setMarker] = createSignal<MaplibreMarker>();
		const newWaypoints = [
			...previewWaypoints().slice(0, index),
			{
				id: window.crypto.randomUUID(),
				lngLat: snappedLngLat,
				marker,
				setMarker,
			},
			...previewWaypoints().slice(index),
		];

		updateWaypoints(newWaypoints);
	};

	const removeIndexWaypoint = () => {
		const index = Math.floor(indexRef?.valueAsNumber ?? 0);
		const newWaypoints = [
			...previewWaypoints().slice(0, index),
			...previewWaypoints().slice(index + 1),
		];

		updateWaypoints(newWaypoints);
	};

	createEffect(() => {
		const coordinates = route()?.geometry.coordinates;
		if (!coordinates) return;

		const middle = coordinates.slice(1, -1);
		const newWaypoints = middle.map((position) => {
			const lngLat = new LngLat(position[0] ?? 0, position[1] ?? 0);
			const [marker, setMarker] = createSignal<MaplibreMarker>();
			return {
				id: window.crypto.randomUUID(),
				lngLat,
				marker,
				setMarker,
			};
		});

		updateWaypoints(newWaypoints);
	});

	const handleDrag = (event: {
		type: "dragstart" | "drag" | "dragend";
		target: MaplibreMarker;
	}) => {
		const map = store.map;
		if (!map) return;

		const marker = event.target;
		const id = Array.from(marker.getElement().classList.values()).find(
			(value) => value.startsWith("id__"),
		);
		if (!id) return;

		const waypointId = id.replace("id__", "");
		const currentLngLat = marker.getLngLat();
		const snappedLngLat = mapSnap(map, currentLngLat);
		marker.setLngLat(snappedLngLat);

		const waypoint = previewWaypoints().find((w) => w.id === waypointId);
		if (!waypoint) return;

		const newWaypoint = { ...waypoint, lngLat: snappedLngLat };
		const newWaypoints = previewWaypoints().map((w) =>
			w.id === waypointId ? newWaypoint : w,
		);

		setPreviewWaypoints(newWaypoints);
	};

	const routeIsValid = createMemo(() => {
		return (
			routePreview()?.every((line) => line.properties.is_valid_angle) ?? true
		);
	});

	return (
		<>
			<div class="edit-location">
				<SearchBox
					item={routeTitle}
					setItem={setRouteTitle}
					items={items()}
					placeholder="Search for a route"
				/>
				<UpdateButton
					disabled={!route() || status.loading || !routeIsValid()}
					invalid={!routeIsValid()}
					onClick={updateRoute}
					status={status}
				/>
				<div class="waypoint-buttons">
					<p>Start</p>
					<button type="button" class="button" onClick={unshiftWaypoint}>
						<Icon icon="add" />
					</button>
					<button type="button" class="button" onClick={shiftWaypoint}>
						<Icon icon="remove" />
					</button>
				</div>
				<div class="waypoint-buttons">
					<label>
						<input
							type="number"
							value="0"
							ref={indexRef}
							min="0"
							max={initialWaypoints().length}
							step="1"
						/>
					</label>
					<button type="button" class="button" onClick={addIndexWaypoint}>
						<Icon icon="add" />
					</button>
					<button type="button" class="button" onClick={removeIndexWaypoint}>
						<Icon icon="remove" />
					</button>
				</div>
				<div class="waypoint-buttons">
					<p>End</p>
					<button type="button" class="button" onClick={pushWaypoint}>
						<Icon icon="add" />
					</button>
					<button type="button" class="button" onClick={popWaypoint}>
						<Icon icon="remove" />
					</button>
				</div>
				<For each={initialWaypoints()}>
					{(waypoint, index) => (
						<Marker
							lngLat={waypoint.lngLat}
							options={{
								draggable: true,
								className: `draggable-marker id__${waypoint.id}`,
							}}
							events={{ dragend: handleDrag, drag: handleDrag }}
							setMarker={waypoint.setMarker}
						>
							<p>{index()}</p>
						</Marker>
					)}
				</For>
			</div>
			<For each={routePreview() ?? []}>
				{(lineString) => (
					<>
						<GeoJSONSource
							id={lineString.properties?.id}
							source={{
								type: "geojson",
								data: lineString,
							}}
						/>
						<Layer
							layer={{
								id: lineString.properties?.id,
								type: "line",
								source: lineString.properties?.id,
								paint: {
									"line-color": [
										"case",
										["boolean", ["get", "is_valid_angle"], false],
										COLORS.DEEP_BLUE,
										COLORS.RED,
									],
									"line-width": 4,
								},
							}}
						/>
					</>
				)}
			</For>
		</>
	);
};
