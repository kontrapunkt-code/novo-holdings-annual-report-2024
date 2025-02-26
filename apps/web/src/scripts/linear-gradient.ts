import Color, { type MixOptions } from "colorjs.io";
import { type BezierDefinition, cubicBezier } from "motion";

export type ColorToStringOptions = Parameters<Color["toString"]>[0];

export const defaultGradientOptions = {
	start: "#ffffff",
	end: "#000000",
	steps: 10,
	direction: "to bottom",
	ease: [0.25, 0.1, 0.25, 1] as BezierDefinition,
	mixOptions: { space: "srgb" } as MixOptions,
	toStringOptions: { format: "hex", precision: 2 } as ColorToStringOptions,
};

export const generateGradient = (
	options: Partial<typeof defaultGradientOptions>,
) => {
	const { start, end, steps, direction, ease, mixOptions, toStringOptions } = {
		...defaultGradientOptions,
		...options,
	};

	const progressor = cubicBezier(...ease);
	const gradientSteps = Array.from({ length: steps }, (_, i) => i / steps).map(
		(progress) => {
			const startColor = new Color(start);
			const endColor = new Color(end);
			const easedProgress = progressor(progress);
			const mixedColor = startColor.mix(endColor, easedProgress, mixOptions);
			const outputColor = mixedColor.toString(toStringOptions);
			const percentage = Math.round(progress * 1000) / 10;
			return `${outputColor} ${percentage}%`;
		},
	);
	return `linear-gradient(${direction}, ${gradientSteps.join(", ")})`;
};
