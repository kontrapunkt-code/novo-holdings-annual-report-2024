import type { Icon as IconType } from "@dfds-route-map/lib";
import type { VoidComponent } from "solid-js";

interface Props {
	icon: IconType;
	ref?: SVGSVGElement;
	title?: string;
}

export const Icon: VoidComponent<Props> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			data-icon={props.icon}
			ref={props.ref}
		>
			<title>{props.title ?? props.icon}</title>
			<use href={`/api/icons.svg#${props.icon}`} />
		</svg>
	);
};
