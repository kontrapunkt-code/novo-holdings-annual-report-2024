import { GeoJSONSource } from "@/components/maplibre/geojson-source";
import { LocationCluster } from "@/components/solid/location-cluster";
import { LocationPoint } from "@/components/solid/location-point";
import { LocationStory } from "@/components/solid/location-story";
import type { FilterGroup, Locations } from "@/env";
import { TRANSITION_OPTIONS } from "@/scripts/const";
import { store } from "@/scripts/store";
import { point } from "@turf/turf";
import type { GeoJSONSourceSpecification } from "maplibre-gl";
import { animate } from "motion";
import {
	type VoidComponent,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";

export type LocationFeature = NonNullable<Locations>["features"][number];
export type LocationProperties = LocationFeature["properties"];

export const LOCATIONS_SOURCE = "locations-source";

const emptySource: GeoJSONSourceSpecification = {
	type: "geojson",
	data: {
		type: "FeatureCollection",
		features: [],
	},
	generateId: true,
	// cluster: true,
	// clusterRadius: 18,
};

export const LocationManager: VoidComponent = () => {
	const [source, setSource] = createSignal(emptySource);

	onMount(() => {
		window.addEventListener("map-entrance", mapEntrance);
	});

	onCleanup(() => {
		window.removeEventListener("map-entrance", mapEntrance);
	});

	const mapEntrance = async () => {
		animateLocations([], [], { duration: 0 });

		await new Promise((resolve) => setTimeout(resolve, 300));

		const allIds = store.locations?.features.map((f) => f.properties.id) ?? [];
		animateLocations([], allIds, {
			duration: 1.2,
			ease: [0.09, 0.41, 0.19, 1],
			delay: 0.2,
		});
	};

	createEffect<FilterGroup>((previousFilterGroup) => {
		const filter = (filterGroup: FilterGroup) => (feature: LocationFeature) =>
			!filterGroup
			|| feature.properties.filter_groups?.some(
				(_id) => filterGroup?._id === _id,
			);

		const wasActiveIds =
			store.locations?.features
				?.filter(filter(previousFilterGroup))
				.map((feature) => feature.properties.id) ?? [];

		const isActiveIds =
			store.locations?.features
				?.filter(filter(store.filterGroup))
				.map((feature) => feature.properties.id) ?? [];

		animateLocations(wasActiveIds, isActiveIds);

		return store.filterGroup;
	}, store.filterGroup);

	const animateLocations = (
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
							store.locations?.features.map((feature) => {
								const wasActive = wasActiveIds.includes(feature.properties.id);
								const isActive = isActiveIds.includes(feature.properties.id);

								// If location was active and is still active, return the same point
								if (wasActive && isActive) {
									return feature;
								}

								// If location wasn't active and isn't active, return an empty point
								if (!wasActive && !isActive) {
									return point([0, 0]);
								}

								// Animate the location by scaling it from 0 to 1 if it is active, or from 1 to 0 if it isn't active
								return point(feature.geometry.coordinates, {
									...feature.properties,
									scale: isActive ? progress : (progress - 1) * -1,
								});
							}) ?? [],
					},
				});
			},
		});
	};

	return (
		<GeoJSONSource id={LOCATIONS_SOURCE} source={source()}>
			<LocationPoint />
			<LocationCluster />
			<LocationStory />
		</GeoJSONSource>
	);
};
