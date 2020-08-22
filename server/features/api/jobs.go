package api

import (
	"encoding/json"
	"github.com/dskline/jobsearch/features/scrapers/jobscrapers"
	"net/http"
)

func scrapeJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	var scraperOptions jobscrapers.ScraperOptions
	_ = json.NewDecoder(r.Body).Decode(&scraperOptions)
	jobscrapers.ScrapeJobs(scraperOptions)
}
