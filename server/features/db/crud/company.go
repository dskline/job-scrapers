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
