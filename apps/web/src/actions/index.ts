import { center } from "@/actions/center";
import { countries } from "@/actions/countries";
import { countryLabels } from "@/actions/country-labels";
import { filterGroups } from "@/actions/filter-groups";
import { globalSettings } from "@/actions/global-settings";
import { locations } from "@/actions/locations";
import { maxBounds } from "@/actions/max-bounds";
import { routes } from "@/actions/routes";
import { defineAction } from "astro:actions";
import { SANITY_STUDIO_TOKEN } from "astro:env/server";
import { z } from "astro:schema";
import { sanityClient as defaultSanityClient } from "sanity:client";

const sanityClient = defaultSanityClient.withConfig({
	token: SANITY_STUDIO_TOKEN,
});

const zGeopoint = () =>
	z.object({
		_type: z.literal("geopoint"),
		lat: z
			.number()
			.min(-90)
			.max(90)
			.optional()
			.describe("Latitude value between -90 and 90 degrees"),
		lng: z
			.number()
			.min(-180)
			.max(180)
			.optional()
			.describe("Longitude value between -180 and 180 degrees"),
		alt: z.number().optional().describe("Altitude value in meters"),
	});

const SANITY_STUDIO_PASSWORD = "c8b6a800-a764-41ed-adaf-a601f589e18b";

export const server = {
	updateLocation: defineAction({
		input: z.object({
			_id: z.string(),
			password: z.string(),
			geopoint: zGeopoint(),
		}),
		handler: async ({ password, _id, geopoint }) => {
			if (password !== SANITY_STUDIO_PASSWORD) {
				throw new Error("Invalid password");
			}

			if (!_id) {
				throw new Error("Invalid _id");
			}

			try {
				const result = await sanityClient.patch(_id).set({ geopoint }).commit();
				return result;
			} catch (error) {
				throw new Error("Failed to update location");
			}
		},
	}),
	updateRoute: defineAction({
		input: z.object({
			_id: z.string(),
			password: z.string(),
			waypoints: z.array(zGeopoint()),
		}),
		handler: async ({ password, _id, waypoints }) => {
			if (password !== SANITY_STUDIO_PASSWORD) {
				throw new Error("Invalid password");
			}

			if (!_id) {
				throw new Error("Invalid _id");
			}

			try {
				const result = await sanityClient
					.patch(_id)
					.set({ waypoints })
					.commit({ autoGenerateArrayKeys: true });
				return result;
			} catch (error) {
				throw new Error("Failed to update location");
			}
		},
	}),
	center,
	countries,
	countryLabels,
	filterGroups,
	globalSettings,
	locations,
	maxBounds,
	routes,
};
