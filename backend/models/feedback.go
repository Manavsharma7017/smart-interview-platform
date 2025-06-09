package models

import (
	"time"
)

type Feedback struct {
	ID           string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	ResponseID   string    `gorm:"not null;index"`
	Clarity      string    `validate:"required"`
	Tone         string    `validate:"required"`
	Relevance    string    `validate:"required"`
	OverallScore string    `validate:"required"`
	Suggestion   string    `validate:"required"`
	CreatedAt    time.Time `gorm:"autoCreateTime"`
}
