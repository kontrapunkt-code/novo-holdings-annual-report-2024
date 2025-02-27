import case_ from "./case";
import globalSettings from "./global-settings";
import imageCombo from "./image-combo";
import { modules } from "./modules";
import page from "./page";

export const schemas = [globalSettings, page, imageCombo, case_, ...modules];
