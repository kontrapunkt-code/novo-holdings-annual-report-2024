import type { TransitionDirectionalAnimations } from "astro";

export const customTransition = {
	forwards: {
		old: {
			name: "slide-up",
			duration: "0.5s",
			easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
			direction: "reverse",
		},
		new: {
			name: "slide-up",
			duration: "0.5s",
			easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
		},
	},
	backwards: {
		old: {
			name: "slide-down",
			duration: "0.5s",
			easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
		},
		new: {
			name: "slide-down",
			duration: "0.5s",
			easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
			direction: "reverse",
		},
	},
} satisfies TransitionDirectionalAnimations;
