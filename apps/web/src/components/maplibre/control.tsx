import { store } from "@/scripts/store";
import type { ControlPosition, IControl } from "maplibre-gl";
import { type ParentComponent, createEffect, onCleanup } from "solid-js";

interface Props {
	control?: IControl;
	position?: ControlPosition;
}

export const Control: ParentComponent<Props> = (props) => {
	createEffect(() => {
		const map = store.map;
		const control = props.control;
		if (!map || !control) return;

		map.addControl(control, props.position);

		onCleanup(() => {
			map.removeControl(control);
		});
	});

	return props.children;
};
