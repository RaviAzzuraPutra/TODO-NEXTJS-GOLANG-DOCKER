package model

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	Id           *string `json:"id" gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()"`
	Title        *string `json:"title"`
	Description  *string `json:"description"`
	Category     *string `json:"category"`
	Priority     *string `json:"priority"`
	Deadline     *string `json:"deadline"`
	Is_Completed bool    `json:"is_completed" gorm:"default:false"`
	Ai_Insight   *string `json:"ai_insight"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
}
