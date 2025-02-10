import { Layer } from "@/components/maplibre/layer";
import { Marker } from "@/components/maplibre/marker";
import { Icon } from "@/components/solid/icon";
import { ImageIcon } from "@/components/solid/image-icon";
import {
	LOCATIONS_SOURCE,
	type LocationProperties,
} from "@/components/solid/location-manager";
import { Overlay } from "@/components/solid/overlay";
import { BG_LOCATION_LAYER } from "@/scripts/const";
import { springEasing } from "@/scripts/eases";
import { vw } from "@/scripts/helpers";
import { setStore, store } from "@/scripts/store";
import { COLORS, type Icon as IconType } from "@dfds-route-map/lib";
import type { Point } from "geojson";
import type {
	FilterSpecification,
	LngLatLike,
	MapLayerEventType,
} from "maplibre-gl";
import { type AnimationOptions, animate } from "motion";
import {
	For,
	Show,
	type VoidComponent,
	createEffect,
	createSignal,
} from "solid-js";

export const LOCATION_STORY_BG = "location-story-background";
export const LOCATION_STORY_POINTS = "location-story-points";
export const LOCATION_STORY_SYMBOL = "location-story-symbol";
export const LOCATION_STORY_ICON = "location-story-icon";

const storyFilter: FilterSpecification = [
	"all",
	["!", ["boolean", ["get", "cluster"], false]],
	["boolean", ["get", "is_story"], false],
];

export const LocationStory: VoidComponent = () => {
	let parent: HTMLDivElement | undefined;
	let point: HTMLButtonElement | undefined;
	let location: HTMLParagraphElement | undefined;
	let cardMask: HTMLDivElement | undefined;
	let card: HTMLDivElement | undefined;

	const [lngLat, setLngLat] = createSignal<LngLatLike>();
	const [properties, setProperties] = createSignal<LocationProperties>();
	const [hiding, setHiding] = createSignal<Promise<void>>();

	const clickPoint = () => {
		const map = store.map;
		if (!map || !store.hoverable) return;

		map.easeTo({
			center: lngLat(),
			zoom: map.getZoom() + 1,
			duration: 600,
			easing: springEasing(600, 0.16),
		});
	};

	const show = async (
		event: MapLayerEventType["mouseover"] | MapLayerEventType["touchstart"],
	) => {
		const feature = event.features?.[0];
		if (
			!parent ||
			!feature ||
			!point ||
			!location ||
			!cardMask ||
			!card ||
			store.overlayOn
		)
			return;

		await hiding();

		animate(parent, { pointerEvents: "auto", opacity: 1 }, { duration: 0 });
		setStore({ overlayOn: true });
		setProperties(feature.properties as LocationProperties);
		setLngLat((feature.geometry as Point).coordinates as LngLatLike);

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.3,
			bounce: 0.2,
		};

		const top = event.point.y < 120 + card.clientHeight;
		const left = event.point.x < card.clientWidth / 2 + 16;
		const right = event.point.x > vw() - card.clientWidth / 2 - 16;
		const y = top ? "calc(50% + 1.5rem)" : "calc(-50% - 1.5rem)";
		const x =
			left ? "calc(50% - 1rem)"
			: right ? "calc(-50% + 1rem)"
			: 0;

		animate(
			point,
			{
				width: location.clientWidth + 24,
				height: "2rem",
				backgroundColor: COLORS.DEEP_BLUE,
			},
			options,
		);

		animate(
			location,
			{
				opacity: 1,
				scale: 1,
			},
			options,
		);

		animate(
			cardMask,
			{
				width: card.clientWidth,
				height: card.clientHeight,
				x: [x, x],
				y: [y, y],
				opacity: 1,
			},
			options,
		);
	};

	const hide = () => {
		if (!parent || !cardMask || !point || !location) return;
		setHiding(new Promise<void>((resolve) => setTimeout(resolve, 200)));

		animate(parent, { pointerEvents: "none" }, { duration: 0 });
		animate(parent, { opacity: 0 }, { duration: 0, delay: 0.2 });

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.2,
			bounce: 0.1,
		};

		animate(
			point,
			{
				width: "1rem",
				height: "1rem",
				backgroundColor: COLORS.SEA_BLUE,
			},
			options,
		);

		animate(
			location,
			{
				scale: 0.5,
				opacity: 0,
			},
			options,
		);

		animate(
			cardMask,
			{
				width: "4rem",
				height: "4rem",
				opacity: 0,
			},
			options,
		);
	};

	createEffect(() => {
		if (!store.overlayOn) {
			hide();
		}
	});

	return (
		<>
			{/* Feature icon */}
			<For
				each={
					[
						"freight_ferry_routes",
						"logistics_solutions",
						"logistics_transport",
						"passenger_ferry_routes",
						"port_terminals",
					] satisfies IconType[]
				}
			>
				{(icon) => <ImageIcon id={icon} icon={icon} width={16} height={16} />}
			</For>
			<Layer
				beforeId={BG_LOCATION_LAYER}
				layer={{
					id: LOCATION_STORY_SYMBOL,
					source: LOCATIONS_SOURCE,
					type: "symbol",
					filter: [
						"all",
						["!", ["boolean", ["get", "cluster"], false]],
						["boolean", ["get", "is_story"], false],
						["boolean", ["get", "is_featured_story"], false],
					],
					layout: {
						"icon-image": "{category_icon}",
						"icon-size": 0.5,
						"icon-allow-overlap": true,
					},
					paint: {
						"icon-opacity": [
							"*",
							1,
							["number", ["feature-state", "scale"], 1],
							["number", ["get", "scale"], 1],
						],
					},
				}}
			/>

			{/* Story background circle */}
			<Layer
				beforeId={LOCATION_STORY_SYMBOL}
				layer={{
					id: LOCATION_STORY_BG,
					source: LOCATIONS_SOURCE,
					type: "circle",
					filter: storyFilter,
					paint: {
						"circle-color": COLORS.SEA_BLUE,
						"circle-radius": [
							"case",
							["boolean", ["get", "is_featured_story"], false],
							[
								"*",
								28,
								["number", ["feature-state", "scale"], 1],
								["number", ["get", "scale"], 1],
							],
							[
								"*",
								18,
								["number", ["feature-state", "scale"], 1],
								["number", ["get", "scale"], 1],
							],
						],
						"circle-opacity": 0.2,
					},
				}}
				events={{
					...(store.hoverable ? { mouseover: show } : { touchstart: show }),
				}}
			/>

			{/* Story points */}
			<Layer
				beforeId={LOCATION_STORY_BG}
				layer={{
					id: LOCATION_STORY_POINTS,
					source: LOCATIONS_SOURCE,
					type: "circle",
					filter: storyFilter,
					paint: {
						"circle-color": COLORS.SEA_BLUE,
						"circle-radius": [
							"case",
							["boolean", ["get", "is_featured_story"], false],
							[
								"*",
								18,
								["number", ["feature-state", "scale"], 1],
								["number", ["get", "scale"], 1],
							],
							[
								"*",
								8,
								["number", ["feature-state", "scale"], 1],
								["number", ["get", "scale"], 1],
							],
						],
					},
				}}
			/>

			{/* Story marker */}
			<Marker lngLat={lngLat()}>
				<Overlay />
				<div class="location-card location-story" ref={parent}>
					<button type="button" class="point" ref={point} onClick={clickPoint}>
						<p ref={location}>{properties()?.location}</p>
					</button>
					<div class="card-mask" ref={cardMask}>
						<div class="card" ref={card}>
							<Show when={properties()?.is_featured_story}>
								<div class="header">
									<div class="image">
										<Icon icon={properties()?.category_icon ?? "location"} />
										<img
											src={`/api/images/locations/${properties()?.id}.webp`}
											width="72"
											height="72"
											decoding="sync"
											loading="eager"
											alt={properties()?.location ?? "location"}
										/>
									</div>
									<h2 class="title">{properties()?.category_title}</h2>
								</div>
							</Show>
							<p class="description">{properties()?.description}</p>
							<Show when={properties()?.link_url}>
								{(linkUrl) => (
									<p>
										<a
											href={linkUrl()}
											target="_blank"
											rel="noreferrer noopener"
										>
											{`${properties()?.link_title} ->`}
										</a>
									</p>
								)}
							</Show>
						</div>
					</div>
				</div>
			</Marker>
		</>
	);
};
