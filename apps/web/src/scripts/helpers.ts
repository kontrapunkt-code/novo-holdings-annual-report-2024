export function vw() {
	return typeof window !== "undefined" ?
			Math.max(
				document.documentElement.clientWidth || 0,
				window.innerWidth || 0,
			)
		:	0;
}

export function vh() {
	return typeof window !== "undefined" ?
			Math.max(
				document.documentElement.clientHeight || 0,
				window.innerHeight || 0,
			)
		:	0;
}

export const formatYear = (date?: string | null): string => {
	if (!date) return "Present";
	return new Date(date).getFullYear().toString();
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const tryCatch = async <T extends (...args: any[]) => Promise<any>>(
	method: T,
): Promise<
	[
		(
			| (Awaited<ReturnType<T>> extends never ? null : Awaited<ReturnType<T>>)
			| null
		),
		Error | null,
	]
> => {
	try {
		return [await method(), null];
	} catch (error) {
		return [null, error instanceof Error ? error : new Error(String(error))];
	}
};
