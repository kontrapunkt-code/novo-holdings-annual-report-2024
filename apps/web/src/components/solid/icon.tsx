import type { Icon as IconType } from "@novo-holdings-annual-report-2024/lib";
import { Show, type VoidComponent } from "solid-js";

interface Props {
	icon?: IconType | null;
	ref?: SVGSVGElement;
	title?: string;
	class?: string;
}

export const Icon: VoidComponent<Props> = (props) => {
	return (
		<Show when={props.icon}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				data-icon={props.icon}
				ref={props.ref}
				class={props.class}
			>
				<title>{props.title ?? props.icon}</title>
				<use href={`/api/icons.svg#${props.icon}`} />
			</svg>
		</Show>
	);
};
