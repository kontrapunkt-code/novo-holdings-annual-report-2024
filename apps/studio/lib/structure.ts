import {
	Draw,
	Earth,
	Filter,
	Location,
	Need,
	Settings,
} from "@carbon/icons-react";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type {
	StructureBuilder,
	StructureResolverContext,
} from "sanity/structure";

export const structure = (
	S: StructureBuilder,
	context: StructureResolverContext,
) => {
	return S.list()
		.title("Admin")
		.items([
			S.listItem()
				.title("Global settings")
				.icon(Settings)
				.child(
					S.document()
						.schemaType("globalSettings")
						.id("globalSettings")
						.title("Global settings"),
				),
			S.listItem()
				.title("Filters")
				.icon(Filter)
				.child(
					S.list()
						.title("Filters")
						.items([
							orderableDocumentListDeskItem({
								type: "filterGroup",
								title: "Filter Groups",
								icon: Filter,
								S,
								context,
							}),
							S.listItem()
								.title("Services")
								.icon(Need)
								.child(S.documentTypeList("service").title("Services")),
						]),
				),
			S.divider(),
			S.listItem()
				.title("Countries")
				.icon(Earth)
				.child(
					S.document()
						.schemaType("countries")
						.id("countries")
						.title("Countries"),
				),
			S.listItem()
				.title("Routes")
				.icon(Draw)
				.child(S.documentTypeList("route").title("Routes")),
			S.listItem()
				.title("Locations")
				.icon(Location)
				.child(S.documentTypeList("location").title("Locations")),
		]);
};
