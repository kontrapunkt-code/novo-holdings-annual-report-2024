import { Document, Settings } from "@carbon/icons-react";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) => {
	return S.list()
		.title("Admin")
		.items([
			S.listItem()
				.title("Pages")
				.icon(Document)
				.child(
					S.documentTypeList("page")
						.title("Pages")
						.defaultOrdering([{ field: "title", direction: "asc" }]),
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
