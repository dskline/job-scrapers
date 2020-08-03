package main

import (
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/scrapers/jobscrapers"
)

func main() {
	db.Connect()

	jobscrapers.ScrapeJobs([]jobscrapers.JobScraper{
		jobscrapers.ScraperIndeed{},
		jobscrapers.ScraperZipRecruiter{},
	})
}
