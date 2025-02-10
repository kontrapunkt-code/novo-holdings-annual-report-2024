/// <reference types="@sanity/astro/module" />

interface CustomEventMap {
	"loader-data": CustomEvent<number>;
}

declare global {
	interface Window {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Window, ev: CustomEventMap[K]) => void,
			options?: boolean | AddEventListenerOptions,
		): void;
		removeEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Window, ev: CustomEventMap[K]) => void,
			options?: boolean | EventListenerOptions,
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(
			ev: CustomEventMap[K],
		): boolean;
	}
}
