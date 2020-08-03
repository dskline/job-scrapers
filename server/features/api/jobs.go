package api

import (
	"github.com/dskline/jobsearch/features/scrapers/jobscrapers"
	"net/http"
)

func scrapeJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jobscrapers.ScrapeJobs()
}
