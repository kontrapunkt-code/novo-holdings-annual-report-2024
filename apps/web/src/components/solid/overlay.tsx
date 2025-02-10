import { setStore, store } from "@/scripts/store";
import { animate } from "motion";
import { type VoidComponent, createEffect } from "solid-js";

export const Overlay: VoidComponent = () => {
	let element: HTMLButtonElement | undefined;

	createEffect(() => {
		store.overlayOn ? show() : hide();
	});

	const show = () => {
		const map = store.map;
		if (!map || !element) return;

		animate(element, { pointerEvents: "auto" }, { duration: 0 });
		map.on("movestart", hide);
	};

	const hide = () => {
		const map = store.map;
		if (!map || !element) return;

		animate(element, { pointerEvents: "none" }, { duration: 0 });
		map.off("movestart", hide);

		setStore({ overlayOn: false });
	};

	return (
		<button
			class="overlay"
			type="button"
			onMouseEnter={hide}
			onMouseOver={hide}
			onFocus={hide}
			onTouchStart={hide}
			ref={element}
		/>
	);
};
