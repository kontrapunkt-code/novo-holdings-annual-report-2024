import { Document, Settings } from "@carbon/icons-react";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) => {
	return S.list()
		.title("Admin")
		.items([
			// Pages list
			S.listItem()
				.title("Pages")
				.icon(Document)
				.child(
					S.list()
						.title("Pages")
						.items([
							// All pages
							S.listItem()
								.title("All Pages")
								.icon(Document)
								.child(
									S.documentList()
										.title("All Pages")
										.filter('_type == "page"')
										.defaultOrdering([{ field: "title", direction: "asc" }]),
								),
						]),
				),

			S.divider(),

			// Global settings
			S.listItem()
				.title("Settings")
				.icon(Settings)
				.child(
					S.document()
						.id("globalSettings")
						.schemaType("globalSettings")
						.documentId("globalSettings"),
				),
		]);
};
