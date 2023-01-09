package api

import (
	"github.com/dskline/jobsearch/features/companies/scrapers"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/crud"
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

func updateCompany(c *gin.Context) {
	if company := crud.RetrieveById(c.Param("companyId")); company.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Company not found"})
	} else {
		scrapers.ScrapeCompanyDetails(company.CompanyName)
		c.JSON(http.StatusOK, gin.H{"message": "Company updated"})
	}
}

func ignoreCompany(c *gin.Context) {
	var user model.User
	var company model.Company
	db.Instance().FirstOrCreate(&user, model.User{
		Email: "test@domain.com",
	})
	db.Instance().First(&company, c.Param("companyId"))

	if company.CompanyName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Company not found"})
	} else {
		db.Instance().Create(&model.UserIgnores{
			Company: company,
			User:    user,
		})
		c.JSON(http.StatusOK, gin.H{"message": "Company ignored"})
	}
}
