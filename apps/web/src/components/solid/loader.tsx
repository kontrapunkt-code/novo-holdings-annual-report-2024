import { store } from "@/scripts/store";
import { type VoidComponent, createEffect } from "solid-js";

export const Loader: VoidComponent = () => {
	createEffect(() => {
		const loaded =
			store.globalSettings
			&& store.filterGroups
			&& store.routes
			&& store.locations
			&& store.countryLabels
			&& store.center
			&& store.maxBounds
			&& store.countries;
		if (!loaded) return;

		window.dispatchEvent(new Event("loading-complete"));
	});

	return null;
};
