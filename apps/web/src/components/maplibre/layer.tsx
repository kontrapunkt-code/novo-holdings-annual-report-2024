import { store } from "@/scripts/store";
import type { AddLayerObject, MapLayerEventType } from "maplibre-gl";
import { type VoidComponent, createEffect, onCleanup } from "solid-js";

type LayerEvents = {
	[K in keyof MapLayerEventType]?: (event: MapLayerEventType[K]) => void;
};

interface Props {
	layer: AddLayerObject;
	beforeId?: string;
	events?: LayerEvents;
}

export const Layer: VoidComponent<Props> = (props) => {
	createEffect(() => {
		const map = store.map;
		if (!map || !props.events) return;

		const entries = Object.entries(props.events) as [
			keyof MapLayerEventType,
			(event: MapLayerEventType[keyof MapLayerEventType]) => void,
		][];

		for (const [event, listener] of entries) {
			map.on(event, props.layer.id, listener);
		}

		onCleanup(() => {
			for (const [event, listener] of entries) {
				map.off(event, props.layer.id, listener);
			}
		});
	});

	createEffect(() => {
		const map = store.map;
		if (!map) return;

		map.addLayer(props.layer, props.beforeId);

		onCleanup(() => {
			if (map.getLayer(props.layer.id)) {
				map.removeLayer(props.layer.id);
			}
		});
	});

	return null;
};
