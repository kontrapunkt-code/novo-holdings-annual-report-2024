import { defineQuery } from "groq";

export const PAGES_QUERY = defineQuery(`
	*[_type == "page" || _type == "case"] {
		_type,
		title,
		slug,
		project,
		startDate,
		endDate,
		heroImage,
		modules[] {
			_type == "atAGlanceModule" => {
				...,
			},
			_type == "articleTextModule" => {
				...,
			},
			_type == "articleQuoteModule" => {
				...,
			},
			_type == "articleStatsModule" => {
				...,
			},
			_type == "articleGalleryModule" => {
				...,
			},
			_type == "articleFigureModule" => {
				...,
			},
			_type == "sideBySideModule" => {
  				...,
			},
			_type == "highlightsModule" => {
				...,
			},
			_type == "newsModule" => {
				...,
				"videoUrl": video.asset -> url,
			},
			_type == "caseHighlightsModule" => {
				...,
				cases[] -> {
					title,
					slug,
					project,
					startDate,
					endDate,
					heroImage,
				},
			},
			_type == "articleHeroModule" => {
				...,
			},
		}
	}
`);

export const GLOBAL_SETTINGS_QUERY = defineQuery(`
	*[_type == "globalSettings"][0] {
		globalTitle,
		logo,
		homePage->,
	}
`);
