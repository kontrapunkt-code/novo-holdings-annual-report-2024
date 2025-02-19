export const COLORS = {
	BG: "#b7ddff",
	DEEP_BLUE: "#012b45",
	SEEP_BLUE: "#134B9D",
	SEA_BLUE: "#2469f5",
	SKY_BLUE: "#4caaff",
	LIGHT_SKY_BLUE: "#d1ebff",
	LIGHT_SKY_BLUE_2: "#e8f5ff",
	SAND: "#dcd7c0",
	LIGHT_SAND: "#edebde",
	WHITE: "#ffffff",
	SAFETY_YELLOW: "#ebff64",
	GREEN: "#087f58",
	LIGHT_GREEN: "#afe1bb",
	PURPLE: "#5a2846",
	LIGHT_PURPLE: "#e1dcff",
	RED: "#ff4135",
	LIGHT_RED: "#ffd5d8",
	ORANGE: "#ff871a",
	LIGHT_ORANGE: "#ffcd87",
	YELLOW: "#ffd93b",
	LIGHT_YELLOW: "#ffe691",
	BLACK: "#000000",
} as const;

type TitledListValue<T> = { title: string; value: T };

export const CATEGORY_ICONS = [
	{ title: "Logistics solutions", value: "logistics_solutions" },
	{ title: "Passenger ferry routes", value: "passenger_ferry_routes" },
	{ title: "Freight ferry routes", value: "freight_ferry_routes" },
	{ title: "Port terminals", value: "port_terminals" },
	{ title: "Logistics transport", value: "logistics_transport" },
] as const satisfies TitledListValue<Icon>[];

export const ICONS = [
	"arrow_back",
	"arrow_forward",
	"arrow_outward",
	"close",
	"download",
] as const;

export type Icon = (typeof ICONS)[number];
