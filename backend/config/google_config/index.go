package google_config

import "os"

type Google_Config struct {
	CLIENT_ID     string
	CLIENT_SECRET string
	CALENDAR_ID   string
}

func GoogleConfig() *Google_Config {
	return &Google_Config{
		CLIENT_ID:     os.Getenv("CLIENT_ID"),
		CLIENT_SECRET: os.Getenv("CLIENT_SECRET"),
		CALENDAR_ID:   os.Getenv("GOOGLE_CALENDAR"),
	}
}
