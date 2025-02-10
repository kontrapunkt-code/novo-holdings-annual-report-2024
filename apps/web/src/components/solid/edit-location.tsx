import { Marker } from "@/components/maplibre/marker";
import { SearchBox } from "@/components/solid/search-box";
import { UpdateButton } from "@/components/solid/update-button";
import type { Locations } from "@/env";
import { mapSnap } from "@/scripts/map-snap";
import { store } from "@/scripts/store";
import { actions } from "astro:actions";
import type { LngLat, Marker as MarkerType } from "maplibre-gl";
import {
	type Component,
	createEffect,
	createMemo,
	createResource,
	createSignal,
} from "solid-js";

type Location = NonNullable<Locations>["features"][number];

type LocationUpdate = {
	_id?: string;
	lngLat?: LngLat;
};

export const EditLocation: Component = () => {
	const [lngLat, setLngLat] = createSignal<LngLat>();
	const [marker, setMarker] = createSignal<MarkerType>();
	const [locationTitle, setLocationTitle] = createSignal<string>();
	const [locationUpdate, setLocationUpdate] = createSignal<LocationUpdate>();

	const items = createMemo<string[]>(
		() =>
			store.locations?.features.map(
				(location) => location.properties.location ?? "",
			) ?? [],
	);
	const location = createMemo<Location | undefined>(() =>
		store.locations?.features.find(
			(location) => location.properties.location === locationTitle(),
		),
	);

	const [status, { mutate }] = createResource(
		locationUpdate,
		async (locationUpdate) => {
			const password = localStorage.getItem("SANITY_STUDIO_PASSWORD");
			if (!locationUpdate?.lngLat || !locationUpdate?._id || !password) {
				throw new Error("Invalid location update");
			}

			await actions.updateLocation({
				_id: locationUpdate._id,
				password,
				geopoint: {
					_type: "geopoint",
					lng: locationUpdate.lngLat.lng,
					lat: locationUpdate.lngLat.lat,
				},
			});

			// Reset status after 2 seconds
			setTimeout(mutate, 2000);

			return true;
		},
	);

	const updateLocation = async () => {
		setLocationUpdate({
			_id: location()?.properties.id,
			lngLat: lngLat(),
		});
	};

	createEffect(() => {
		const map = store.map;
		if (!map || lngLat() || !location()) return;

		const snappedLngLat = mapSnap(map, map.getCenter());
		marker()?.setLngLat(snappedLngLat).addTo(map);
		setLngLat(snappedLngLat);
	});

	const handleDrag = () => {
		const map = store.map;
		if (!map) return;

		const currentLngLat = marker()?.getLngLat();
		const snappedLngLat = mapSnap(map, currentLngLat);
		marker()?.setLngLat(snappedLngLat);
		setLngLat(snappedLngLat);
	};

	return (
		<>
			<div class="edit-location">
				<SearchBox
					item={locationTitle}
					setItem={setLocationTitle}
					items={items()}
					placeholder="Search for a location"
				/>
				<UpdateButton
					disabled={!location() || !lngLat() || status.loading}
					onClick={updateLocation}
					status={status}
				/>
			</div>
			<Marker
				options={{ draggable: true, className: "draggable-marker" }}
				events={{ dragend: handleDrag, drag: handleDrag }}
				setMarker={setMarker}
			/>
		</>
	);
};
