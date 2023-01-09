package api

import (
	jobscrapers2 "github.com/dskline/jobsearch/features/jobs/jobscrapers"
	"github.com/gin-gonic/gin"
	"net/http"
)

type ScrapeJobsOptions struct {
	Search   string `json:"searchTerm"`
	Location string `json:"location"`
}

func scrapeJobs(c *gin.Context) {
	var body ScrapeJobsOptions
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	jobscrapers2.ScrapeJobs(jobscrapers2.ScraperOptions{
		Search:   body.Search,
		Location: body.Location,
	})
	c.JSON(http.StatusOK, gin.H{"message": "done"})
}
