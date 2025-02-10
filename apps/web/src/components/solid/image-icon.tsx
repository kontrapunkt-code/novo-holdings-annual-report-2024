import { store } from "@/scripts/store";
import type { Icon as IconType } from "@dfds-route-map/lib";
import {
	type VoidComponent,
	createEffect,
	createMemo,
	onCleanup,
} from "solid-js";

interface Props {
	id: string;
	icon: IconType;
	color?: string;
	width?: number;
	height?: number;
}

export const ImageIcon: VoidComponent<Props> = (props) => {
	let img: HTMLImageElement | undefined;

	const src = createMemo(
		() => `/api/${props.icon}-${props.color ?? "white"}.svg`,
	);

	createEffect(() => {
		const map = store.map;
		if (!map || !img) return;

		map.addImage(props.id, img);

		onCleanup(() => {
			map.removeImage(props.id);
		});
	});

	return (
		<img
			ref={img}
			src={src()}
			alt=""
			width={(props.width ?? 32) * 2}
			height={(props.height ?? 32) * 2}
		/>
	);
};
