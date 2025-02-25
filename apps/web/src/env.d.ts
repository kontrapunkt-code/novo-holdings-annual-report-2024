/// <reference types="@sanity/astro/module" />

import type { LottieWeb } from "@lottielab/lottie-player/web";

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

declare module "solid-js" {
	namespace JSX {
		type ElementProps<T> = {
			// Add both the element's prefixed properties and the attributes
			[K in keyof T]: Props<T[K]> & HTMLAttributes<T[K]>;
		};
		// Prefixes all properties with `prop:` to match Solid's property setting syntax
		type Props<T> = {
			[K in keyof T as `prop:${string & K}`]?: T[K];
		};
		interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {
			"lottie-player": LottieWeb;
		}
	}
}
