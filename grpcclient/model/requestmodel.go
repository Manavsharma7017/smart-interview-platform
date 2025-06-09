package model

type RequestModel struct {
	Question   string `json:"question"`
	Answer     string `json:"answer"`
	UserId     string `json:"userId"`
	ResponceId string `json:"responceId"`
}
