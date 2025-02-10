import { COUNTRIES_DETAIL_LEVELS } from "@/scripts/const";
import type { APIRoute, GetStaticPaths } from "astro";
import { actions } from "astro:actions";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () => {
	return COUNTRIES_DETAIL_LEVELS.map((detail) => ({
		params: { detail },
	}));
};

export const GET: APIRoute = async ({ params, callAction }) => {
	const detail = Number(params.detail);

	const { data, error } = await callAction(actions.countries, detail);

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
