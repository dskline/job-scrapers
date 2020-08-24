package api

import (
	"github.com/gin-gonic/gin"
)

func ConfigureRoutes() {
	router := gin.Default()
	v1 := router.Group("/api/v1")
	{
		v1.POST("/jobs/scrape", scrapeJobs)
		v1.POST("/companies/:companyId/setIgnoreFlag", ignoreCompany)
		v1.POST("/companies/:companyId/requestUpdate", updateCompany)
	}
	router.Run(":9000")
}
