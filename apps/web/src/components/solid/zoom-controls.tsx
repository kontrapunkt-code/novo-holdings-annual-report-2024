import { Control } from "@/components/maplibre/control";
import { Icon } from "@/components/solid/icon";
import { springEasing } from "@/scripts/eases";
import { store } from "@/scripts/store";
import type { IControl } from "maplibre-gl";
import { animate, stagger } from "motion";
import { type VoidComponent, createSignal, onCleanup, onMount } from "solid-js";

class ZoomControl implements IControl {
	private _container: HTMLElement;

	constructor(element: HTMLElement) {
		this._container = element;
	}

	onAdd() {
		return this._container;
	}

	onRemove() {
		this._container?.parentNode?.removeChild(this._container);
	}
}

export const ZoomControls: VoidComponent = () => {
	let element: HTMLDivElement | undefined;

	const [control, setControl] = createSignal<ZoomControl>();

	onMount(() => {
		if (!element) return;
		setControl(new ZoomControl(element));

		window.addEventListener("map-entrance", mapEntrance);
	});

	onCleanup(() => {
		window.removeEventListener("map-entrance", mapEntrance);
	});

	const mapEntrance = async () => {
		if (!element) return;
		const buttons = element.querySelectorAll("button");

		await new Promise((resolve) => setTimeout(resolve, 300));

		animate(
			buttons,
			{
				opacity: [0, 1],
				transform: ["translateY(1rem)", "translateY(0)"],
			},
			{
				delay: stagger(0.2),
				duration: 1.1,
				ease: [0.09, 0.41, 0.19, 1],
			},
		);
	};

	const zoomIn = () => {
		const map = store.map;
		if (!map) return;

		map.zoomIn({
			duration: 500,
			easing: springEasing(500, 0.2),
		});
	};

	const zoomOut = () => {
		const map = store.map;
		if (!map) return;

		map.zoomOut({
			duration: 500,
			easing: springEasing(500, 0.2),
		});
	};

	return (
		<Control control={control()} position="bottom-right">
			<div ref={element} class="zoom-control">
				<button type="button" onClick={zoomIn}>
					<Icon icon="add" title="Zoom in" />
				</button>
				<button type="button" onClick={zoomOut}>
					<Icon icon="remove" title="Zoom out" />
				</button>
			</div>
		</Control>
	);
};
