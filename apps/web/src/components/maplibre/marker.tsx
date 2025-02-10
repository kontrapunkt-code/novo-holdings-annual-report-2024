import { store } from "@/scripts/store";
import {
	type LngLatLike,
	Marker as MaplibreMarker,
	type MarkerOptions,
} from "maplibre-gl";
import {
	type JSXElement,
	type ParentComponent,
	type Setter,
	createEffect,
	createSignal,
	mergeProps,
	onCleanup,
} from "solid-js";

type MarkerEvents = {
	[key: string]: (event: {
		type: "dragstart" | "drag" | "dragend";
		target: MaplibreMarker;
	}) => void;
};

interface Props {
	children?: JSXElement;
	class?: string;
	lngLat?: LngLatLike;
	options?: MarkerOptions;
	events?: MarkerEvents;
	setMarker?: Setter<MaplibreMarker | undefined>;
}

export const Marker: ParentComponent<Props> = (props) => {
	let element: HTMLDivElement | undefined;

	const [marker, setMarker] = createSignal<MaplibreMarker>();

	createEffect(() => {
		if (!props.events) return;

		const entries = Object.entries(props.events) as [
			string,
			(event: unknown) => void,
		][];

		for (const [event, listener] of entries) {
			marker()?.on(event, listener);
		}

		onCleanup(() => {
			for (const [event, listener] of entries) {
				marker()?.off(event, listener);
			}
		});
	});

	createEffect(() => {
		const map = store.map;
		if (!map) return;

		const options = mergeProps(props.options, { element });
		const marker = new MaplibreMarker(options);

		if (props.setMarker) {
			props.setMarker(marker);
		}

		setMarker(marker);

		onCleanup(() => {
			marker.remove();
		});
	});

	createEffect(() => {
		const map = store.map;
		if (!map || !props.lngLat) return;

		marker()?.setLngLat(props.lngLat);
		marker()?.addTo(map);
	});

	return (
		<div ref={element} class={props.class}>
			{props.children}
		</div>
	);
};
