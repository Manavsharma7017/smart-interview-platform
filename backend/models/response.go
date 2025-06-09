package models

import "time"

type Response struct {
	ResponseID     string           `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	SessionID      string           `gorm:"not null" validate:"required"`
	Session        InterviewSession `gorm:"foreignKey:SessionID" validate:"-"`
	QuestionID     *string          `gorm:"index" validate:"required"`
	UserQuestionID *string          `gorm:"not null" validate:"required"`
	UserQuestion   UserQuestion     `gorm:"foreignKey:UserQuestionID" validate:"-"`
	Answer         string           `validate:"required"`
	SubmittedAt    time.Time        `gorm:"autoCreateTime"`
	// Feedback references ResponseID to create the relationship from Response -> Feedback
	Feedback *Feedback `gorm:"foreignKey:ResponseID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" validate:"-"`

	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
