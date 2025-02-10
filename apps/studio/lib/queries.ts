import { defineQuery } from "groq";

export const GLOBAL_SETTINGS_QUERY = defineQuery(`
*[_type == "globalSettings"]
`);

export const ROUTE_QUERY = defineQuery(`
{
    "type": "FeatureCollection",
    "features": *[_type == "route"] {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": 
                // Start
                [[coalesce(start->geopoint.lng, 0), coalesce(start->geopoint.lat, 0)]] +
                // Waypoints
                coalesce(waypoints[] { "p": [coalesce(lng, 0), coalesce(lat, 0)] }.p, []) +
                // End
                [[coalesce(end->geopoint.lng, 0), coalesce(end->geopoint.lat, 0)]],
        },
        "properties": {
            "id": _id,
            "location": start->location + " ↔ " + end->location,
            "type": coalesce(type, "ferry"),
            "filter_groups": filterGroups[]._ref,
            "start": start._ref,
            "end": end._ref,
        },
    },
}
`);

export const COUNTRY_QUERY = defineQuery(`
{
    "countriesToExclude": *[_type == "countries"][0].countriesToExclude,
}
`);

export const LOCATION_QUERY = defineQuery(`
{
    "type": "FeatureCollection",
    "features": *[_type == "location"] {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [coalesce(geopoint.lng, 0), coalesce(geopoint.lat, 0)],
        },
        "properties": {
            "id": _id,
            "is_location": true,
            "location": location,
            "is_story": coalesce(isStory, false),
            "description": description,
            "is_featured_story": coalesce(isFeaturedStory, false),
            "image_url": image.asset->url + "?auto=format&w=72&h=72&fit=crop",
            "link_title": coalesce(link.title, "Read more"),
            "link_url": link.url,
            "category_title": category.title,
            "category_icon": category.icon,
            "filter_groups": coalesce(filterGroups[]._ref, [_id]),
            "cluster": false,
            "scale": 1,
        },
    },
}
`);

export const FILTER_GROUP_QUERY = defineQuery(`
*[_type == "filterGroup"] | order(orderRank) {
    _id,
    title,
    description,
    icon,
    services[] {
        _ref,
    },
}
`);

export const IMAGES_QUERY = defineQuery(`
*[_type == "location" && defined(image)] {
    "params": {
        "id": _id,
    },
    "props": {
        "url": image.asset->url + "?format=webp&w=72&h=72&fit=crop",
    },
}
`);
