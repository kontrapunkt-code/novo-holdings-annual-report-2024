import type {
	DocumentActionComponent,
	DocumentActionsContext,
	StringRule,
	Template,
} from "sanity";
import type { schemas } from "../schemas";

type Schema = (typeof schemas)[number]["name"];

// Define types that should be treated as singletons
const singletonTypes: Set<Schema> = new Set(["countries", "globalSettings"]);

// Define actions allowed for singleton documents
const singletonActions: Set<DocumentActionComponent["action"]> = new Set([
	"discardChanges",
	"publish",
	"restore",
]);

const deleteTypes: Set<Schema> = new Set([
	"countryLabels",
	"location",
	"route",
]);

const deleteActions: Set<DocumentActionComponent["action"]> = new Set([
	"delete",
	"discardChanges",
	"publish",
	"restore",
	"duplicate",
]);

// Filter out singleton types and specific document types from the global "New document" menu options
export const templates = (templates: Template[]) =>
	templates.filter((t) => !singletonTypes.has(t.schemaType as Schema));

// For singleton types, only allow actions that are explicitly included in the `singletonActions` list
// For non-singleton types, return all actions
export const actions = (
	input: DocumentActionComponent[],
	context: DocumentActionsContext,
) =>
	singletonTypes.has(context.schemaType as Schema) ?
		input.filter(({ action }) => singletonActions.has(action))
	: deleteTypes.has(context.schemaType as Schema) ?
		input.filter(({ action }) => deleteActions.has(action))
	:	input;

export const literal = (string: string) => (rule: StringRule) =>
	rule.custom((value) => value === string || `Type must be '${string}'`);
