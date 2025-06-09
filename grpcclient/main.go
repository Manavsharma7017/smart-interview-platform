package main

import (
	"grpcclient/config"
	"grpcclient/router"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		CaseSensitive: true,
	})
	router.GrpcRouter(app)
	port := config.GetPort()
	log.Fatal(app.Listen(port))
}
