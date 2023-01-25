package filters

import (
	"fmt"
	"github.com/dskline/jobsearch/features/db/model"
)

type Filter interface {
	Name() string
	Filter([]model.Job) []model.Job
}

func RunFilters(jobs []model.Job) []model.Job {
	var filters = []Filter{
		FilterByIndustry{},
		FilterByKeywordScore{},
	}
	for _, filter := range filters {
		var lenBefore = len(jobs)
		jobs = filter.Filter(jobs)
		fmt.Println("Filtered", lenBefore-len(jobs), "jobs with", filter.Name())
	}
	return jobs
}
