import { Layer } from "@/components/maplibre/layer";
import { Marker } from "@/components/maplibre/marker";
import { LOCATIONS_SOURCE } from "@/components/solid/location-manager";
import { Overlay } from "@/components/solid/overlay";
import { BG_LOCATION_LAYER, FONT_STACK } from "@/scripts/const";
import { springEasing } from "@/scripts/eases";
import { setStore, store } from "@/scripts/store";
import { COLORS } from "@dfds-route-map/lib";
import type { Point } from "geojson";
import type {
	FilterSpecification,
	GeoJSONSource,
	LngLatLike,
	MapLayerEventType,
} from "maplibre-gl";
import { type AnimationOptions, animate } from "motion";
import { type VoidComponent, createEffect, createSignal } from "solid-js";
import type { ClusterProperties as SuperclusterClusterProperties } from "supercluster";

export type ClusterProperties = SuperclusterClusterProperties | undefined;

export const LOCATION_CLUSTERS = "location-clusters";
export const LOCATION_CLUSTER_LABEL = "location-cluster-label";
export const LOCATION_CLUSTER_MARKER = "location-cluster-marker";

const filter: FilterSpecification = ["boolean", ["get", "cluster"], false];

export const LocationCluster: VoidComponent = () => {
	let parent: HTMLDivElement | undefined;
	let count: HTMLParagraphElement | undefined;

	const [lngLat, setLngLat] = createSignal<LngLatLike>();
	const [properties, setProperties] = createSignal<ClusterProperties>();
	const [hiding, setHiding] = createSignal<Promise<void>>();

	const clickCluster = async (
		event: MapLayerEventType["mousedown"] | MapLayerEventType["touchstart"],
	) => {
		const map = event.target;
		const feature = event.features?.[0];
		if (!feature) return;

		const zoom = await map
			.getSource<GeoJSONSource>(LOCATIONS_SOURCE)
			?.getClusterExpansionZoom(feature.properties.cluster_id);
		if (!zoom) return;

		map.easeTo({
			center: (feature.geometry as Point).coordinates as LngLatLike,
			zoom,
			duration: 600,
			easing: springEasing(600, 0.16),
		});
	};

	const show = async (event: MapLayerEventType["mouseover"]) => {
		const feature = event.features?.[0];
		if (!feature || !parent || !count || store.overlayOn) return;

		await hiding();

		animate(parent, { pointerEvents: "auto", opacity: 1 }, { duration: 0 });
		setStore({ overlayOn: true });
		setLngLat((feature.geometry as Point).coordinates as LngLatLike);
		setProperties(feature.properties as ClusterProperties);

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.3,
			bounce: 0.2,
		};

		animate(
			parent,
			{
				width: "2rem",
				height: "2rem",
				backgroundColor: COLORS.DEEP_BLUE,
			},
			options,
		);
	};

	const hide = () => {
		if (!parent || !count) return;
		setHiding(new Promise<void>((resolve) => setTimeout(resolve, 150)));

		animate(parent, { pointerEvents: "none" }, { duration: 0 });
		animate(parent, { opacity: 0 }, { duration: 0, delay: 0.15 });

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.15,
			bounce: 0.1,
		};

		animate(
			parent,
			{
				width: "1.5rem",
				height: "1.5rem",
				backgroundColor: COLORS.SEA_BLUE,
			},
			options,
		);
	};

	createEffect(() => {
		if (!store.overlayOn) {
			hide();
		}
	});

	return (
		<>
			{/* Cluster labels */}
			<Layer
				beforeId={BG_LOCATION_LAYER}
				layer={{
					id: LOCATION_CLUSTER_LABEL,
					source: LOCATIONS_SOURCE,
					type: "symbol",
					filter,
					layout: {
						"text-field": "{point_count}",
						"text-font": FONT_STACK,
						"text-size": 12,
					},
					paint: {
						"text-color": COLORS.WHITE,
						"text-opacity": [
							"*",
							1,
							["number", ["feature-state", "scale"], 1],
							["number", ["get", "scale"], 1],
						],
					},
				}}
			/>

			{/* Cluster points */}
			<Layer
				beforeId={LOCATION_CLUSTER_LABEL}
				layer={{
					id: LOCATION_CLUSTERS,
					source: LOCATIONS_SOURCE,
					type: "circle",
					filter,
					paint: {
						"circle-color": COLORS.SEA_BLUE,
						"circle-radius": [
							"*",
							12,
							["number", ["feature-state", "scale"], 1],
							["number", ["get", "scale"], 1],
						],
					},
				}}
				events={{
					click: clickCluster,
					...(store.hoverable && { mouseover: show }),
				}}
			/>

			{/* Cluster marker */}
			<Marker lngLat={lngLat()}>
				<Overlay />
				<div class="location-cluster" ref={parent}>
					<p ref={count}>{properties()?.point_count}</p>
				</div>
			</Marker>
		</>
	);
};
