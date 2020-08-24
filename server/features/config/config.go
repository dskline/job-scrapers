package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

func init() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}
}

func Get(key string, defaultValue string) string {
	var value, _ = os.LookupEnv(key)
	if value == "" {
	    return defaultValue
	}
	return value
}
