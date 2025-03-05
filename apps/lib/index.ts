export const ICONS = [
	"arrow_back",
	"arrow_forward",
	"arrow_outward",
	"close",
	"download",
	"logo",
	"play_arrow",
] as const;

export type Icon = (typeof ICONS)[number];
