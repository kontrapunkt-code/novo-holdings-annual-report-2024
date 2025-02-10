import { type EasingFunction, spring } from "motion";

export const springEasing = (
	duration: number,
	bounce = 0.2,
): EasingFunction => {
	const { next, calculatedDuration } = spring({
		keyframes: [0, 1],
		duration,
		bounce,
	});

	return (progress: number) => {
		const duration = calculatedDuration ?? 1;
		const { value } = next(progress * duration);
		return value;
	};
};
