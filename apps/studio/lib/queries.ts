import { defineQuery } from "groq";

export const PAGES_QUERY = defineQuery(`
	*[_type == "page"] {
		title,
		"slug": slug.current,
		"modules": modules[] {
			_type == "heroModule" => {
				_type,
				_key,
				title,
				description,
				image,
			},
			_type == "textModule" => {
				_type,
				_key,
				content
			},
			_type == "imageModule" => {
				_type,
				_key,
				caption,
				image,
			}
		}
	}
`);

export const GLOBAL_SETTINGS_QUERY = defineQuery(`
	*[_type == "globalSettings"][0] {
		globalTitle,
		logo,
		homePage->,
		loadingScreenTitle,
		loadingScreenDescription,
		loadingScreenButtonText
	}
`);
