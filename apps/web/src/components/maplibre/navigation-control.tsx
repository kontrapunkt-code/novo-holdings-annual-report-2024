import { Control } from "@/components/maplibre/control";
import {
	type ControlPosition,
	NavigationControl as MaplibreNavigationControl,
	type NavigationControlOptions,
} from "maplibre-gl";
import type { VoidComponent } from "solid-js";

interface Props {
	options: NavigationControlOptions;
	position?: ControlPosition;
}

export const NavigationControl: VoidComponent<Props> = (props) => {
	return (
		<Control
			control={new MaplibreNavigationControl(props.options)}
			position={props.position}
		/>
	);
};
