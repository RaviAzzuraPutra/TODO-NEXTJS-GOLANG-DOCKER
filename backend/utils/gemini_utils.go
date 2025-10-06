package utils

import (
	"backend/config/gemini_config"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	genai "github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type AiResponse struct {
	Category string `json:"category"`
	Priority string `json:"priority"`
	Insight  string `json:"ai_insight"`
}

func Gemini_Utils(title, description, deadline, lang string) (string, string, string, error) {
	ctx := context.Background()

	client, clientError := genai.NewClient(ctx, option.WithAPIKey(gemini_config.Gemini_Api_Key))

	if clientError != nil {
		return "", "", "", clientError
	}

	defer client.Close()

	geminiModel := client.GenerativeModel(os.Getenv("MODEL"))

	prompt := fmt.Sprintf(`
		You are a highly intelligent academic assistant.
		Analyze the following task and return your answer **strictly in JSON format** like this:

		{
		"category": "string",
		"priority": "High | Medium | Low",
		"ai_insight": "string"
		}

		Task Title: %s
		Task Description: %s
		Task Deadline: %s

		requirements:
		1. Identify the most suitable category (examples: Work, Study, Personal, Health, Finance, Creative, etc.) should be appropriate
		2. Assign a realistic priority, considering the task's urgency and importance, you can only choose from High, Medium, or Low :
			**PRIORITY CLASSIFICATION CRITERIA - USE THESE EXACT RULES:**

			**HIGH PRIORITY** (Choose ONLY if task meets at least 2 criteria):
			- Has imminent deadline (within 3 days) OR clear time sensitivity
			- Consequences of delay are severe (financial loss, health risk, major opportunity cost)
			- Blocks other critical tasks or people
			- Related to core responsibilities or urgent matters
			- Work deadlines with severe consequences if missed
			- Critical health/medical matters
			- Urgent financial obligations (bills, taxes)

			**MEDIUM PRIORITY** (Choose if task meets these characteristics):
			- Important but not immediately urgent (deadline 4-14 days away)
			- Supports long-term goals or development
			- Moderate consequences if slightly delayed
			- Requires planning and sustained effort
			- Work projects without urgent deadlines
			- Study assignments due in 1-2 weeks
			- Financial planning sessions

			**LOW PRIORITY** (Choose if task meets these characteristics):
			- Deadline far in the future (15+ days)
			- Minimal consequences if postponed
			- Enhancement or optional activity
			- Can be done during spare time without impact
			- Entertainment activities (movies, sports, games)
			- Hobbies and leisure activities
			- Social gatherings and hangouts
			- Any recreational event without critical importance
		3. Write a deep and analytical insight in %s language, written in a sophisticated and academically refined tone equivalent to a PhD professor, but still natural and motivational, Use everyday language that is easy to understand, the insight must be related to the task and provide some suggestions in the form of a list, and must be very detailed.
		4. Avoid generic suggestions; make it contextually relevant. 
		5. Make it as good as possible.
		6. Do not include any introduction, explanation, or commentary outside the JSON format.
	`, title, description, lang)

	resp, err := geminiModel.GenerateContent(ctx, genai.Text(prompt))

	if err != nil {
		return "", "", "", err
	}

	if len(resp.Candidates) == 0 {
		return "", "", "", fmt.Errorf("no response from Gemini")
	}

	var text string
	for _, part := range resp.Candidates[0].Content.Parts {
		if textPart, ok := part.(genai.Text); ok {
			text += string(textPart)
		}
	}

	start := strings.Index(text, "{")
	end := strings.LastIndex(text, "}")

	if start == -1 || end == -1 {
		return "", "", "", fmt.Errorf("invalid response format")
	}

	jsonStr := text[start : end+1]

	jsonStr = strings.ReplaceAll(jsonStr, "\n", "")
	jsonStr = strings.ReplaceAll(jsonStr, "\r", "")
	jsonStr = strings.ReplaceAll(jsonStr, "\t", "")
	jsonStr = strings.ReplaceAll(jsonStr, "\\", "\\\\")
	jsonStr = strings.ReplaceAll(jsonStr, "```json", "")
	jsonStr = strings.ReplaceAll(jsonStr, "```", "")
	jsonStr = strings.TrimSpace(jsonStr)

	if !json.Valid([]byte(jsonStr)) {
		return "", "", "", fmt.Errorf("invalid JSON format\nResponse: %s", text)
	}

	var result AiResponse

	if err := json.Unmarshal([]byte(jsonStr), &result); err != nil {
		return "", "", "", fmt.Errorf("failed to parse JSON: %v\nResponse: %s", err, text)
	}

	return result.Category, result.Priority, result.Insight, nil
}
