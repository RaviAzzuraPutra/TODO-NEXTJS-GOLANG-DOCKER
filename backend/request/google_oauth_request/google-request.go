package google_oauth_request

type GoogleRequest struct {
	IdToken string `json:"idToken" binding:"required"`
}
