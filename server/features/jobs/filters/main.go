package filters

import (
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/dskline/jobsearch/features/debug/log"
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
		log.Info("Filtered %d jobs with %s", lenBefore-len(jobs), filter.Name())
	}
	return jobs
}
