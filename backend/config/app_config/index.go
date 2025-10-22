package app_config

import "os"

var PORT string

func AppConfig() {
	PORT = os.Getenv("PORT_BACKEND")
}
