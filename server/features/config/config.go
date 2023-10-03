package config

import (
	"github.com/dskline/jobsearch/features/debug/log"
	"github.com/joho/godotenv"
	"os"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Error("No .env file found")
	}
}

func Get(key string, defaultValue string) string {
	var value, _ = os.LookupEnv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
