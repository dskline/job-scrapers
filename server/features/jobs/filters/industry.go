package filters

import (
	"github.com/dskline/jobsearch/features/companies/filters"
	"github.com/dskline/jobsearch/features/db/model"
)

type FilterByIndustry struct{}

func (filter FilterByIndustry) Name() string {
	return "FilterByIndustry"
}

func (filter FilterByIndustry) Filter(jobs []model.Job) []model.Job {
	var filteredJobs []model.Job
	var filteredIndustries = filters.GetFilteredIndustries()
	for _, job := range jobs {
		if !filteredIndustries[job.Company.Industry] {
			filteredJobs = append(filteredJobs, job)
		}
	}
	return filteredJobs
}
