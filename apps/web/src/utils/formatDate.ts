export const formatYear = (date: string | undefined): string => {
	if (!date) return "Present";
	return new Date(date).getFullYear().toString();
};
