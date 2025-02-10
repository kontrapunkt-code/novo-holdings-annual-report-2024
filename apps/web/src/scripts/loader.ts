import { spring, stagger } from "motion";
import { animate } from "motion/mini";

export async function initApp() {
	const root = document.querySelector("#app");
	const button: HTMLButtonElement | null =
		document.querySelector("#loader button");
	if (!root || !button) return;

	animate(
		"#loader",
		{
			transform: ["scale(0.8)", "scale(1)"],
		},
		{
			duration: 1.3,
			ease: [0.22, 1, 0.36, 1],
		},
	);

	animate(
		"#loader > *",
		{
			opacity: 1,
		},
		{
			duration: 0.7,
			delay: stagger(0.1),
		},
	);

	window.addEventListener("loading-complete", () => {
		if (button.classList.contains("loaded")) return;
		button.classList.add("loaded");
		button.addEventListener("click", animateOut);

		if (import.meta.env.DEV) animateOut();
	});

	let progress = 0;
	const total = Number(button.dataset.total);
	const animateProgress = (size: number) => {
		progress += size;
		if (progress <= total) {
			animate(
				"#loader button span",
				{
					transform: `translateX(${(progress / total) * 100 - 100}%)`,
				},
				{
					visualDuration: 0.6,
					type: spring,
					bounce: 0,
				},
			);
		}
	};

	window.addEventListener("loader-data", (e) => animateProgress(e.detail));
	animateProgress(20_000);

	const [{ App }, { render }] = await Promise.all([
		import("@/components/solid/app"),
		import("solid-js/web"),
	]);

	animateProgress(80_000);

	render(() => App({}), root);

	const animateOut = async () => {
		button.removeEventListener("click", animateOut);

		animate(
			"#loader > *",
			{
				opacity: 0,
			},
			{
				delay: stagger(0.05),
				duration: 0.3,
				ease: [0.62, 0, 0.81, 0.43],
			},
		);

		animate(
			"#loader",
			{
				transform: "scale(1.15)",
				pointerEvents: "none",
				touchAction: "none",
			},
			{
				duration: 0.3,
				ease: [0.62, 0, 0.81, 0.43],
			},
		);

		window.dispatchEvent(new Event("map-entrance"));

		await animate(
			"#loader",
			{
				opacity: 0,
			},
			{
				duration: 1.2,
				ease: [0.09, 0.41, 0.19, 1],
				delay: 0.3,
			},
		);

		document.querySelector("#loader")?.remove();
	};
}
