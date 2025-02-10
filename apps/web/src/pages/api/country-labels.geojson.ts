import type { APIRoute } from "astro";
import { actions } from "astro:actions";

export const prerender = true;

export const GET: APIRoute = async ({ callAction }) => {
	const { data, error } = await callAction(actions.countryLabels, null);

	if (error || !data) {
		return new Response(error?.message || "Error", { status: 500 });
	}

	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
			"Cache-Control": "public, max-age=31536000", // Cache for 1 year since this is static
		},
	});
};
