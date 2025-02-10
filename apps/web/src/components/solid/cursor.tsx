import { store } from "@/scripts/store";
import { type VoidComponent, createEffect } from "solid-js";

export const Cursor: VoidComponent = () => {
	createEffect(() => {
		const map = store.map;
		if (!map) return;
		map.getCanvas().style.cursor = store.cursor ?? "";
	});

	return null;
};
