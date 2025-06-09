package model

type AIResponse struct {
	Question     string `json:"question"`
	Answer       string `json:"answer"`
	UserId       string `json:"userId"`
	Clarity      string `validate:"required"`
	Tone         string `validate:"required"`
	Relevance    string `validate:"required"`
	OverallScore string `validate:"required"`
	Suggestion   string `validate:"required"`
}
