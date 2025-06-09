package handlers

import (
	"backend/models"
	"backend/services"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

type UserQuestion struct {
	ResponceId string
	Question   string
	Answer     string
	UserId     string
}

func GetFeedbackHandler(c *fiber.Ctx) error {
	var ResponseID = c.Params("id")
	var Feedback models.Feedback
	if ResponseID == "" {
		return c.Status(400).SendString("ID is required")
	}
	_, err := services.GetFeedbackByResponseID(ResponseID, &Feedback)
	if err != nil {
		return c.Status(500).SendString("Error fetching feedback")
	}
	if Feedback.ID == "" {
		return c.Status(404).SendString("Feedback not found")
	}

	return c.Status(fiber.StatusCreated).JSON(Feedback)
}
func CreateFeedbackHandler(c *fiber.Ctx) error {
	var userrequest UserQuestion
	var userFeedback models.Feedback
	if err := c.BodyParser(&userrequest); err != nil {
		return c.Status(400).SendString("Invalid request body")
	}
	jsonData, err := json.Marshal(userrequest)
	if err != nil {
		return c.Status(500).SendString("Error marshalling JSON")
	}
	data, err := services.CreateFeedback(&userFeedback, jsonData, userrequest.ResponceId)
	if err != nil {
		return c.Status(500).SendString("Error creating feedback")
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Feedback created successfully",
		"data":    data,
	})

}
