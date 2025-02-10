import { Control } from "@/components/maplibre/control";
import { Icon } from "@/components/solid/icon";
import type { Icon as IconType } from "@dfds-route-map/lib";
import type { IControl } from "maplibre-gl";
import { animate, stagger } from "motion";
import { type VoidComponent, createSignal, onCleanup, onMount } from "solid-js";

class LegendControl implements IControl {
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

export const LegendControls: VoidComponent = () => {
	let element: HTMLDivElement | undefined;

	const [control, setControl] = createSignal<LegendControl>();

	onMount(() => {
		if (!element) return;
		setControl(new LegendControl(element));

		window.addEventListener("map-entrance", mapEntrance);
	});

	onCleanup(() => {
		window.removeEventListener("map-entrance", mapEntrance);
	});

	const mapEntrance = async () => {
		if (!element) return;
		const items = element.querySelectorAll(".legend-item");

		await new Promise((resolve) => setTimeout(resolve, 300));

		animate(
			items,
			{
				opacity: [0, 1],
				transform: ["translateY(1rem)", "translateY(0)"],
			},
			{
				delay: stagger(0.15),
				duration: 1.1,
				ease: [0.09, 0.41, 0.19, 1],
			},
		);
	};

	return (
		<Control control={control()} position="bottom-left">
			<div ref={element} class="legend-control">
				<LegendItem icon="location_legend" title="Location" />
				<LegendItem icon="ferry_legend" title="Ferry" />
				<LegendItem icon="rail_legend" title="Rail" />
			</div>
		</Control>
	);
};

interface LegendItemProps {
	icon: IconType;
	title: string;
}

const LegendItem: VoidComponent<LegendItemProps> = (props) => {
	return (
		<div class="legend-item">
			<Icon icon={props.icon} title={props.title} />
			<p>{props.title}</p>
		</div>
	);
};
