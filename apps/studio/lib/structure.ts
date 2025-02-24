import { CogIcon, DocumentIcon } from "@sanity/icons";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) => {
	return S.list()
		.title("Admin")
		.items([
			// Pages list
			S.listItem()
				.title("Pages")
				.icon(DocumentIcon)
				.child(
					S.list()
						.title("Pages")
						.items([
							// All pages
							S.listItem()
								.title("All Pages")
								.icon(DocumentIcon)
								.child(
									S.documentList()
										.title("All Pages")
										.filter('_type == "page"')
										.defaultOrdering([{ field: "title", direction: "asc" }]),
								),
							S.listItem()
								.title("Cases")
								.icon(DocumentIcon)
								.child(
									S.documentList()
										.title("All Cases")
										.filter('_type == "case"')
										.defaultOrdering([{ field: "title", direction: "asc" }]),
								),
						]),
				),

			S.divider(),

			// Global settings
			S.listItem()
				.title("Settings")
				.icon(CogIcon)
				.child(
					S.document()
						.id("globalSettings")
						.schemaType("globalSettings")
						.documentId("globalSettings"),
				),
		]);
};
