package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	Id           *string `json:"id" gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()"`
	Google_id    *string `json:"google_id"`
	Email        *string `json:"email"`
	Display_name *string `json:"display_name"`
	First_name   *string `json:"first_name"`
	Last_name    *string `json:"last_name"`
	Slug         *string `json:"slug"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
}
