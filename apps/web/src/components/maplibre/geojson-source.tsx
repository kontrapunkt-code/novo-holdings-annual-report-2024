import { store } from "@/scripts/store";
import type {
	GeoJSONSourceSpecification,
	GeoJSONSource as MaplibreGeoJSONSource,
} from "maplibre-gl";
import { type ParentComponent, createEffect, onCleanup } from "solid-js";

interface Props {
	id: string;
	source: GeoJSONSourceSpecification;
}

export const GeoJSONSource: ParentComponent<Props> = (props) => {
	createEffect<Props>((previousProps) => {
		const map = store.map;
		if (!map) return props;

		if (previousProps.id !== props.id) {
			if (map.getSource(previousProps.id)) {
				map.removeSource(previousProps.id);
			}
		} else {
			const existingSource = map.getSource<MaplibreGeoJSONSource>(props.id);
			if (existingSource) {
				existingSource.setData(props.source.data);

				return props;
			}
		}

		map.addSource(props.id, props.source);

		return props;
	}, props);

	onCleanup(() => {
		const map = store.map;
		if (!map) return;

		if (map.getSource(props.id)) {
			map.removeSource(props.id);
		}
	});

	return props.children;
};
