package crud

import (
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/model"
)

func RetrieveById(companyId string) model.Company {
	var company model.Company
	db.Instance().First(&company, companyId)
	return company
}

func RetrieveByCompanyNames(companyNames []string) map[string]model.Company {
	var companies []model.Company
	db.Instance().Where("company_name IN ?", companyNames).Find(&companies)

	// convert companies to a map for faster lookup
	var companyMap = make(map[string]model.Company)
	if companies == nil {
		return companyMap
	}
	for _, company := range companies {
		companyMap[company.CompanyName] = company
	}
	return companyMap
}
