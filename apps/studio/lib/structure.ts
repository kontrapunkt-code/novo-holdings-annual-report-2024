import { Settings } from "@carbon/icons-react";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) => {
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
		]);
};
