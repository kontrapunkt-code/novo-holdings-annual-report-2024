import type {
	DocumentActionComponent,
	DocumentActionsContext,
	Template,
} from "sanity";
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
