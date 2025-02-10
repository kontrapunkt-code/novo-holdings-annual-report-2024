import { Icon } from "@/components/solid/icon";
import type { FilterGroup as FilterGroupType } from "@/env";
import { setStore, store } from "@/scripts/store";
import { type AnimationOptions, animate, hover, stagger } from "motion";
import {
	For,
	Show,
	type VoidComponent,
	createEffect,
	onCleanup,
	onMount,
} from "solid-js";

export const FilterGroups: VoidComponent = () => {
	let formRef: HTMLFormElement | undefined;
	let menuInput: HTMLInputElement | undefined;

	onMount(() => {
		window.addEventListener("map-entrance", mapEntrance);
	});

	onCleanup(() => {
		window.removeEventListener("map-entrance", mapEntrance);
	});

	const mapEntrance = async () => {
		if (!formRef) return;
		const labels = formRef.querySelectorAll("label");

		await new Promise((resolve) => setTimeout(resolve, 300));

		animate(
			formRef,
			{
				transform: ["scale(0.8)", "scale(1)"],
			},
			{
				duration: 1.2,
				ease: [0.09, 0.41, 0.19, 1],
			},
		);

		animate(
			labels,
			{
				opacity: [0, 1],
				transform: ["translateY(-1rem)", "translateY(0)"],
			},
			{
				delay: stagger(0.1),
				duration: 1,
				ease: [0.09, 0.41, 0.19, 1],
			},
		);
	};

	const handleFilterChange = (event: Event) => {
		const { value } = event.target as HTMLInputElement;

		setStore({
			filterGroup: store.filterGroups?.find((f) => f._id === value),
		});

		if (!menuInput) return;
		menuInput.checked = false;
	};

	return (
		<div class="filter-groups-container">
			<label class="menu-button button">
				<input type="checkbox" name="menu" value="menu" ref={menuInput} />
				<Icon icon="menu" />
				<Icon icon="close" />
				<p>{store.filterGroup?.title ?? "All"}</p>
			</label>
			<form
				class="filter-groups"
				onSubmit={(event) => event.preventDefault()}
				onChange={handleFilterChange}
				ref={formRef}
			>
				<FilterGroup title="All" _id="all" />
				<For each={store.filterGroups}>
					{(filterGroup) => <FilterGroup {...filterGroup} />}
				</For>
			</form>
		</div>
	);
};

const FilterGroup: VoidComponent<Partial<NonNullable<FilterGroupType>>> = (
	props,
) => {
	let element: HTMLDivElement | undefined;

	createEffect(() => {
		const map = store.map;
		if (!element || !map) return;

		if (props._id === store.filterGroup?._id && store.hoverable) {
			show();
		}

		hover(element, () => {
			if (props._id === store.filterGroup?._id) {
				show();
			}

			return () => {
				hide();
			};
		});
	});

	const show = () => {
		const mask = element?.querySelector(".description-mask");
		const description = mask?.querySelector(".description");
		if (!mask || !description) return;

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.3,
			bounce: 0.15,
		};

		animate(
			mask,
			{
				width: description.clientWidth,
				height: description.clientHeight,
				opacity: 1,
			},
			options,
		);

		animate(description, { scale: 1 }, options);
	};

	const hide = () => {
		const mask = element?.querySelector(".description-mask");
		const description = mask?.querySelector(".description");
		if (!mask || !description) return;

		const options: AnimationOptions = {
			type: "spring",
			visualDuration: 0.2,
			bounce: 0,
		};

		animate(
			mask,
			{
				width: description.clientWidth - 128,
				height: description.clientHeight - 128,
				opacity: 0,
			},
			options,
		);

		animate(description, { scale: 0.8 }, options);
	};

	return (
		<div class="filter-group" ref={element}>
			<label class="button">
				{props.icon && <Icon icon={props.icon} />}
				<p>{props.title}</p>
				<input
					type="radio"
					name="filter"
					value={props._id}
					checked={
						props._id === store.filterGroup?._id
						|| (!store.filterGroup && props.title === "All")
					}
				/>
			</label>
			<Show when={props.description}>
				{(description) => (
					<div class="description-mask">
						<p class="description">{description()}</p>
					</div>
				)}
			</Show>
		</div>
	);
};
