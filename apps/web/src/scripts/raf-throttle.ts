/**
 * Creates a throttled function that uses requestAnimationFrame for timing.
 * @template T The type of the callback function
 * @param callback The function to throttle
 * @returns A throttled version of the callback function with a cancel method
 */
export function rafThrottle<T extends (...args: never[]) => void>(
	callback: T,
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
	let requestId: number | null = null;
	let lastArgs: Parameters<T> | null = null;

	/**
	 * Executes the callback with the last known arguments.
	 */
	const executeCallback = () => {
		requestId = null;
		if (lastArgs !== null) {
			callback(...lastArgs);
			lastArgs = null;
		}
	};

	/**
	 * The throttled function.
	 * Schedules the callback execution on the next animation frame if not already scheduled.
	 */
	const throttled = (...args: Parameters<T>) => {
		lastArgs = args;
		requestId ??= requestAnimationFrame(executeCallback);
	};

	/**
	 * Cancels any pending execution of the throttled function.
	 */
	throttled.cancel = () => {
		if (requestId !== null) {
			cancelAnimationFrame(requestId);
			requestId = null;
		}
	};

	return throttled;
}
