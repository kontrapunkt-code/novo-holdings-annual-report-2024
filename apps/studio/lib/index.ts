import {
	type DocumentActionComponent,
	type DocumentActionsContext,
	type FieldDefinition,
	type Slug,
	type SlugValidationContext,
	type Template,
	defineField,
} from "sanity";
import slugify from "slugify";
import type { schemas } from "../schemas";

type Schema = (typeof schemas)[number]["name"];

// Define types that should be treated as singletons
const singletonTypes: Set<Schema> = new Set(["globalSettings"]);

// Define actions allowed for singleton documents
const singletonActions: Set<DocumentActionComponent["action"]> = new Set([
	"discardChanges",
	"publish",
	"restore",
]);

// Filter out singleton types and specific document types from the global "New document" menu options
export const templates = (templates: Template[]) =>
	templates.filter(
		(template) => !singletonTypes.has(template.schemaType as Schema),
	);

// For singleton types, only allow actions that are explicitly included in the `singletonActions` list
// For non-singleton types, return all actions
export const actions = (
	components: DocumentActionComponent[],
	context: DocumentActionsContext,
) =>
	singletonTypes.has(context.schemaType as Schema) ?
		components.filter((component) => singletonActions.has(component.action))
	:	components;

export function defineSlugField(
	fieldDefinition?: Partial<FieldDefinition<"slug">>,
	prefix?: string,
) {
	const slugField = Object.assign(
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description:
				"The url for this page: https://your-site.com/en/[SLUG]. You should always click 'Generate' to generate from the page's title.",
			validation: (rule) =>
				rule.required().custom((slug?: Slug) => {
					const input = slug?.current || "";
					if (!input) return true;
					if (input.endsWith("/")) return `Slug cannot end with "/"`;
					if (input.startsWith("/")) return `Slug cannot start with "/"`;
					if (prefix && !input.startsWith(prefix))
						return `Slug must start with "${prefix}"`;
					return true;
				}),
			options: Object.assign(
				{
					source: "title",
					maxLength: 30,
					slugify(source: string) {
						const options = { lower: true, trim: true, strict: true };
						const slug = `${prefix || ""}${slugify(source, options)}`;
						return slug;
					},
					isUnique: async (slug: string, context: SlugValidationContext) => {
						const { document, getClient } = context;
						const client = getClient({ apiVersion: "2025-01-01" });
						const id = document?._id.replace(/^drafts\./, "");
						const params = {
							draft: `drafts.${id}`,
							published: id,
							slug,
						};
						const query =
							"!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)";
						const result = await client.fetch(query, params);
						return result;
					},
				},
				fieldDefinition?.options,
			),
		}),
		fieldDefinition,
	);

	return slugField;
}
