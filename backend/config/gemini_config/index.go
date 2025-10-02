package gemini_config

import "os"

var Gemini_Api_Key string

func GeminiConfig() {
	Gemini_Api_Key = os.Getenv("GEMINI_API_KEY")
}
