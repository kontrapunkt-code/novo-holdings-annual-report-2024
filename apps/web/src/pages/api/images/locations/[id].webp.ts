import { IMAGES_QUERY } from "@dfds-route-map/studio/queries";
import type { APIRoute, GetStaticPaths } from "astro";
import { sanityClient } from "sanity:client";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () =>
	sanityClient.fetch(IMAGES_QUERY);

export const GET: APIRoute = async ({ params, props }) => {
	try {
		if (!params.id || !props.url) {
			throw new Error("Image id and url are required");
		}

		const imageResponse = await fetch(props.url);
		const imageBuffer = await imageResponse.arrayBuffer();
		const image = Buffer.from(imageBuffer);

		return new Response(image, {
			headers: {
				"content-type": "image/webp",
				"Cache-Control": "public, max-age=31536000", // Cache for 1 year
			},
		});
	} catch (error) {
		console.error("Error fetching image:", error);
		return new Response("Image not found", { status: 404 });
	}
};
