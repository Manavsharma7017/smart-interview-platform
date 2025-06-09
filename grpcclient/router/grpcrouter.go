package router

import (
	"grpcclient/handler"

	"github.com/gofiber/fiber/v2"
)

func GrpcRouter(c *fiber.App) {
	group := c.Group("/grpc")
	group.Post("/call", handler.Grpchandler)

}
