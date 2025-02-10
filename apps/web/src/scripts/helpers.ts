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
