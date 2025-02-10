import { Layer } from "@/components/maplibre/layer";
import { Marker } from "@/components/maplibre/marker";
import {
	LOCATIONS_SOURCE,
	type LocationProperties,
} from "@/components/solid/location-manager";
import { Overlay } from "@/components/solid/overlay";
import { BG_LOCATION_LAYER, MAX_ZOOM } from "@/scripts/const";
import { springEasing } from "@/scripts/eases";
import { setStore, store } from "@/scripts/store";
import { COLORS } from "@dfds-route-map/lib";
import type { Point } from "geojson";
import type {
	FilterSpecification,
	LngLatLike,
	MapLayerEventType,
} from "maplibre-gl";
import { type AnimationOptions, animate } from "motion";
import {
	type VoidComponent,
	createEffect,
	createSignal,
	onCleanup,
} from "solid-js";

export const LOCATION_POINTS = "location-points";

const filter: FilterSpecification = [
	"all",
	["!", ["boolean", ["get", "cluster"], false]],
	["!", ["boolean", ["get", "is_story"], false]],
	["!", ["boolean", ["get", "is_featured_story"], false]],
];

const POINT_SIZE = 4 / 3;

export const LocationPoint: VoidComponent = () => {
	let parent: HTMLButtonElement | undefined;
	let point: HTMLDivElement | undefined;
	let location: HTMLParagraphElement | undefined;

	const [lngLat, setLngLat] = createSignal<LngLatLike>();
	const [properties, setProperties] = createSignal<LocationProperties>();
	const [hiding, setHiding] = createSignal<Promise<void>>();

	const clickPoint = () => {
		const map = store.map;
		if (!map || !store.hoverable) return;

		map.easeTo({
			center: lngLat(),
			zoom: map.getZoom() + 1,
			duration: 600,
			easing: springEasing(600, 0.16),
		});
	};

	const show = async (
		event: MapLayerEventType["mouseover"] | MapLayerEventType["touchstart"],
	) => {
		const feature = event.features?.[0];
		if (!feature || !parent || !point || !location || store.overlayOn) return;

		await hiding();

		animate(parent, { pointerEvents: "auto", opacity: 1 }, { duration: 0 });
		setStore({ overlayOn: true });
		setProperties(feature.properties as LocationProperties);
		setLngLat((feature.geometry as Point).coordinates as LngLatLike);

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.2,
			bounce: 0.25,
		};

		animate(
			point,
			{
				width: location.clientWidth + 24,
				height: "2rem",
				backgroundColor: COLORS.DEEP_BLUE,
			},
			options,
		);

		animate(
			location,
			{
				opacity: 1,
				scale: 1,
			},
			options,
		);
	};

	const hide = () => {
		const map = store.map;
		if (!map || !parent || !point || !location) return;
		setHiding(new Promise<void>((resolve) => setTimeout(resolve, 150)));

		animate(parent, { pointerEvents: "none" }, { duration: 0 });
		animate(parent, { opacity: 0 }, { duration: 0, delay: 0.15 });

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.15,
			bounce: 0.1,
		};

		animate(
			point,
			{
				width: map.getZoom() * POINT_SIZE * 2,
				height: map.getZoom() * POINT_SIZE * 2,
				backgroundColor: COLORS.SEA_BLUE,
			},
			options,
		);

		animate(
			location,
			{
				scale: 0.5,
				opacity: 0,
			},
			options,
		);
	};

	createEffect(() => {
		if (!store.overlayOn) {
			hide();
		}
	});

	createEffect(() => {
		const map = store.map;
		if (!map) return;

		map.on("zoom", handleZoom);
		handleZoom();

		onCleanup(() => {
			map.off("zoom", handleZoom);
		});
	});

	const handleZoom = () => {
		const map = store.map;
		if (!map || !point) return;

		animate(
			point,
			{
				width: map.getZoom() * POINT_SIZE * 2,
				height: map.getZoom() * POINT_SIZE * 2,
			},
			{
				type: "spring",
				visualDuration: 0,
			},
		);
	};

	return (
		<>
			{/* Points */}
			<Layer
				beforeId={BG_LOCATION_LAYER}
				layer={{
					id: LOCATION_POINTS,
					source: LOCATIONS_SOURCE,
					type: "circle",
					filter,
					paint: {
						"circle-color": COLORS.SEA_BLUE,
						"circle-radius": [
							"interpolate",
							["exponential", 1],
							["zoom"],
							0,
							0,
							MAX_ZOOM,
							[
								"*",
								MAX_ZOOM * POINT_SIZE,
								["number", ["feature-state", "scale"], 1],
								["number", ["get", "scale"], 1],
							],
						],
					},
				}}
				events={{
					...(store.hoverable ? { mouseover: show } : { touchstart: show }),
				}}
			/>

			{/* Title marker */}
			<Marker lngLat={lngLat()}>
				<Overlay />
				<button
					type="button"
					class="location-title"
					ref={parent}
					onClick={clickPoint}
				>
					<div class="point" ref={point}>
						<p ref={location}>{properties()?.location}</p>
					</div>
				</button>
			</Marker>
		</>
	);
};
