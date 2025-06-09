package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  No .env file found or error loading it")
	}
}
func GetPort() string {
	return os.Getenv("PORT")
}
