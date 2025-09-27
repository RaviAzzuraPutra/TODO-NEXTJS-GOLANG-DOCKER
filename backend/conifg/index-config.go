package conifg

import (
	"backend/conifg/app_config"
	"backend/conifg/db_config"
	"backend/conifg/gemini_config"
	"backend/conifg/google_config"
)

func IndexConfig() {
	app_config.AppConfig()
	db_config.DBConfig()
	gemini_config.GeminiConfig()
	google_config.GoogleConfig()
}
