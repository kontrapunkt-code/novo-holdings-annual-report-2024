import { Loader } from "@/components/solid/loader";
import { Suspense, type VoidComponent, lazy } from "solid-js";

const RouteMap = lazy(async () => {
	const { RouteMap } = await import("@/components/solid/route-map");
	return { default: RouteMap };
});

export const App: VoidComponent = () => {
	return (
		<>
			<Suspense>
				<RouteMap />
			</Suspense>
			<Loader />
		</>
	);
};
