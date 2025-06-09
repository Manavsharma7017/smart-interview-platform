package handler

import (
	"grpcclient/model"
	"grpcclient/service"

	"github.com/gofiber/fiber/v2"
)

func Grpchandler(c *fiber.Ctx) error {
	var request model.RequestModel
	var responce model.AIResponse
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}
	_, err := service.GrpcClient(request, &responce)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to process request",
		})
	}
	return c.Status(fiber.StatusOK).JSON(responce)

}
