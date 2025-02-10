import type { APIRoute } from "astro";
import { actions } from "astro:actions";

export const prerender = true;

export const GET: APIRoute = async ({ callAction }) => {
	const { data, error } = await callAction(actions.routes, null);

	if (error || !data) {
		return new Response(error?.message || "Error", { status: 500 });
	}

	return new Response(JSON.stringify(data));
};
