package filters

import (
	"github.com/dskline/jobsearch/features/db/model"
	"strings"
)

type FilterByKeywordScore struct{}

func (filter FilterByKeywordScore) Name() string {
	return "FilterByKeywordScore"
}

func (filter FilterByKeywordScore) Filter(jobs []model.Job) []model.Job {
	var filteredJobs []model.Job
	for _, job := range jobs {

		var score = 0
		if job.Description != "" {
			for _, keyword := range PREFERRED_LIST {
				if strings.Contains(strings.ToLower(job.Description), keyword) {
					score++
				}
			}
		}
		job.MatchPercentage = float64(score) / float64(len(PREFERRED_LIST))
		if job.MatchPercentage > 0.5 {
			filteredJobs = append(filteredJobs, job)
		}
	}
	return filteredJobs
}

var PREFERRED_LIST = []string{
	"react",
	"tailwind",
	"typescript",
}
