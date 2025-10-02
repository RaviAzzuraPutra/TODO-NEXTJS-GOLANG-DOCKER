package config

import (
	"backend/config/app_config"
	"backend/config/db_config"
	"backend/config/gemini_config"
	"backend/config/google_config"
)

func IndexConfig() {
	app_config.AppConfig()
	db_config.DBConfig()
	gemini_config.GeminiConfig()
	google_config.GoogleConfig()
}
