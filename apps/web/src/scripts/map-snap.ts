import { GRID_SIZE } from "@/scripts/const";
import {
	LngLat,
	type LngLatLike,
	type Map as MaplibreglMap,
	Point,
} from "maplibre-gl";
import { store } from "./store";

/**
 * Snaps a point to the grid.
 * @param map - The map instance.
 * @param lngLat - The point to snap.
 * @param gridSize - The size of the grid.
 * @returns The snapped point.
 */
export const mapSnap = (
	map: MaplibreglMap,
	lngLat: LngLatLike = [0, 0],
	gridSize = GRID_SIZE,
	decimals = 6,
): LngLat => {
	const zoom = map.getZoom();
	const gridSizeZoomed = gridSize * 2 ** zoom;

	const { x, y } = map.project(lngLat);

	const originPoint = map.project(new LngLat(0, 0));
	const relativeX = x - originPoint.x;
	const relativeY = y - originPoint.y;

	const snappedGeoPoint =
		gridSizeZoomed === 0 ?
			new Point(x, y)
		:	new Point(
				originPoint.x + Math.round(relativeX / gridSizeZoomed) * gridSizeZoomed,
				originPoint.y + Math.round(relativeY / gridSizeZoomed) * gridSizeZoomed,
			);

	const unprojectedGeoPoint = map.unproject(snappedGeoPoint);

	const roundedGeoPoint = new LngLat(
		Math.round(unprojectedGeoPoint.lng * 10 ** decimals) / 10 ** decimals,
		Math.round(unprojectedGeoPoint.lat * 10 ** decimals) / 10 ** decimals,
	);

	return roundedGeoPoint;
};

export const isValidAngle = (start: LngLatLike, end: LngLatLike): boolean => {
	const map = store.map;
	if (!map) return true;

	const startPoint = map.project(start);
	const endPoint = map.project(end);

	const deltaX = endPoint.x - startPoint.x;
	const deltaY = endPoint.y - startPoint.y;

	if (deltaX === 0 && deltaY === 0) return true;

	let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
	if (angle < 0) angle += 360;

	const SNAP_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;
	const ANGLE_TOLERANCE = 0.01;

	return SNAP_ANGLES.some(
		(SNAP_ANGLE) => Math.abs(angle - SNAP_ANGLE) <= ANGLE_TOLERANCE,
	);
};
