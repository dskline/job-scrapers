package api

import (
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/crud"
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/dskline/jobsearch/features/scrapers/companyscrapers"
	"github.com/gorilla/mux"
	"net/http"
)

func updateCompany(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if company := crud.RetrieveById(mux.Vars(r)["companyId"]); company.ID == 0 {
		http.Error(w, "companyId not found", http.StatusBadRequest)
	} else {
		w.WriteHeader(http.StatusOK)
		companyscrapers.ScrapeCompanyDetails(company.CompanyName)
	}
}

func ignoreCompany(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var user model.User
	var company model.Company
	db.Instance().FirstOrCreate(&user, model.User{
		Email: "test@domain.com",
	})
	db.Instance().First(&company, mux.Vars(r)["companyId"])

	if company.CompanyName == "" {
		http.Error(w, "companyId not found", http.StatusBadRequest)
	} else {
		w.WriteHeader(http.StatusOK)
		db.Instance().Create(&model.UserIgnores{
			Company: company,
			User:    user,
		})
	}
}
