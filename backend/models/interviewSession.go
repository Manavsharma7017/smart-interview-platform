package models

import "time"

type InterviewSession struct {
	ID            string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID        string         `gorm:"not null"`
	User          User           `gorm:"foreignKey:UserID" validate:"-"`
	DomainID      uint           `gorm:"not null"`
	Domain        Domain         `gorm:"foreignKey:DomainID"`
	UserQuestions []UserQuestion `gorm:"foreignKey:SessionID" validate:"-"`
	Responses     []Response     `gorm:"foreignKey:SessionID" validate:"-"`
	StartedAt     time.Time
	CompletedAt   time.Time
}
