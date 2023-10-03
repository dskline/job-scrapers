package main

import (
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/jobs/scrapers"
)

func main() {
	db.Connect()
	//api.ConfigureRoutes()

	scrapers.ScrapeJobs(scrapers.ScraperOptions{
		Search:   "react developer",
		Location: "remote",
	})
}
