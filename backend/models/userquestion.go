package models

import "time"

type UserQuestion struct {
	ID           string           `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	QuestionID   string           `gorm:"type:uuid;not null" validate:"required"`
	UserDomainID uint             `gorm:"not null" validate:"required"`
	UserDomain   UserDomain       `gorm:"foreignKey:UserDomainID" validate:"-"`
	SessionID    string           `gorm:"not null" validate:"required"`
	Session      InterviewSession `gorm:"foreignKey:SessionID" validate:"-"`
	UserID       string           `gorm:"not null"`
	User         User             `gorm:"foreignKey:UserID" validate:"-"`
	Responses    []Response       `gorm:"foreignKey:UserQuestionID" validate:"-"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
