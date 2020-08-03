package main

import (
	"github.com/dskline/jobsearch/features/api"
	"github.com/dskline/jobsearch/features/db"
)

func main() {
	db.Connect()
	api.ConfigureRoutes()
}
