import {
	type Accessor,
	type Component,
	For,
	type Setter,
	Show,
	createMemo,
	createSignal,
} from "solid-js";

type Props = {
	item: Accessor<string | undefined>;
	setItem: Setter<string | undefined>;
	items: string[];
	placeholder?: string;
};

export const SearchBox: Component<Props> = (props) => {
	let inputRef: HTMLInputElement | undefined;

	const [searchTerm, setSearchTerm] = createSignal<string>("");
	const filteredItems = createMemo<string[]>(
		() =>
			props.items
				.filter((item) =>
					item.toLowerCase().includes(searchTerm().toLowerCase()),
				)
				.sort((a, b) =>
					(a.toLowerCase() ?? "") < (b.toLowerCase() ?? "") ? -1 : 1,
				) ?? [],
	);

	return (
		<div class="search-box">
			<Show when={props.item()}>
				{(item) => (
					<button
						type="button"
						class="selected-item"
						onMouseDown={() => {
							props.setItem();
							setTimeout(() => inputRef?.focus(), 100);
						}}
					>
						{item()}
					</button>
				)}
			</Show>
			<Show when={!props.item()}>
				<input
					ref={inputRef}
					type="text"
					placeholder={props.placeholder}
					onInput={(event) => setSearchTerm(event.currentTarget.value)}
				/>
			</Show>
			<div class="search-results">
				<For each={filteredItems()}>
					{(item) => (
						<button
							type="button"
							class="item"
							onMouseDown={() => props.setItem(item)}
						>
							{item}
						</button>
					)}
				</For>
			</div>
		</div>
	);
};
