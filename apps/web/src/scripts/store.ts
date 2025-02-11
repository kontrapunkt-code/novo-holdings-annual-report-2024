import { createStore } from "solid-js/store";

export const [store, setStore] = createStore({
	loaded: false,
});
