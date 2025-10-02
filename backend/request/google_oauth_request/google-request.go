package google_oauth_request

type GoogleRequest struct {
	IdToken string `json:"id_token" binding:"required"`
}
