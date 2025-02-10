import {
	type MapEventType,
	type MapOptions,
	Map as MaplibreMap,
} from "maplibre-gl";
import {
	type VoidComponent,
	createEffect,
	createMemo,
	onCleanup,
} from "solid-js";

export type MapEvents = {
	[K in keyof MapEventType]?: (event: MapEventType[K]) => void;
};

interface Props {
	mapOptions?: MapOptions;
	events?: MapEvents;
}

export const MapGL: VoidComponent<Props> = (props) => {
	const map = createMemo<MaplibreMap | undefined>(() => {
		if (!props.mapOptions) return;

		const map = new MaplibreMap(props.mapOptions);

		onCleanup(() => {
			map.remove();
		});

		return map;
	});

	createEffect(() => {
		if (!props.events) return;

		const entries = Object.entries(props.events) as [
			keyof MapEventType,
			(event: MapEventType[keyof MapEventType]) => void,
		][];

		for (const [event, listener] of entries) {
			map()?.on(event, listener);
		}

		onCleanup(() => {
			for (const [event, listener] of entries) {
				map()?.off(event, listener);
			}
		});
	});

	return null;
};
