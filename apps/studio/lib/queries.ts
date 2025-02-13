import { defineQuery } from "groq";

export const PAGES_QUERY = defineQuery(`
	*[_type == "page"] {
		title,
		"slug": slug.current,
		"modules": modules[] {
			_type == "atAGlanceModule" => {
				_type,
				_key,
				title,
				items
			},
			_type == "articleHeroModule" => {
				_type,
				_key,
				title,
				subtitle,
				image,
				date
			},
			_type == "articleTextModule" => {
				_type,
				_key,
				content
			},
			_type == "articleQuoteModule" => {
				_type,
				_key,
				quote,
				author,
				role
			},
			_type == "articleStatsModule" => {
				_type,
				_key,
				title,
				stats[] {
					value,
					label,
					description,
					_key
				}
			},
			_type == "articleGalleryModule" => {
				_type,
				_key,
				title,
				images[] {
					...,
					_key
				}
			},
			_type == "articleFigureModule" => {
				_type,
				_key,
				image,
				caption,
				alt,
				width
			},
			_type == "articleRelatedCasesModule" => {
				_type,
				_key,
				title,
				"cases": cases[]-> {
					_ref,
					title,
					"slug": slug.current
				}
			},
			_type == "sideBySideModule" => {
				_type,
				_key,
				title,
				leftContent,
				rightContent,
				image,
				imagePosition
			},
			_type == "highlightsModule" => {
				_type,
				_key,
				title,
				highlights[] {
					title,
					description,
					image,
					"link": link-> {
						_ref,
						"slug": slug.current
					},
					_key
				}
			},
			_type == "newsModule" => {
				_type,
				_key,
				title,
				description,
				newsItems[] {
					title,
					date,
					excerpt,
					image,
					link,
					_key
				}
			},
			_type == "caseHighlightsModule" => {
				_type,
				_key,
				title,
				description,
				cases[] {
					title,
					description,
					period,
					image,
					"link": link-> {
						_ref,
						"slug": slug.current
					},
					featured,
					_key
				}
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
