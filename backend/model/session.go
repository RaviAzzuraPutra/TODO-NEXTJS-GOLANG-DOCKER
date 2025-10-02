package model

import "time"

type Session struct {
	Id            *string `json:"id" gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()"`
	User_id       *string `json:"user_id"`
	Session_token *string `json:"session_token"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
}
