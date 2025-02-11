import globalSettings from "./global-settings";
import { modules } from "./modules";
import page from "./page";

export const schemas = [globalSettings, page, ...modules];
