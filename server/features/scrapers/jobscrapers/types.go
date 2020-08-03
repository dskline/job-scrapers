package jobscrapers

import (
	"context"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"time"
)

type JobScraper interface {
	Name() enum.ScraperName
	Scrape(options ScraperOptions) []model.Job
}
type ScraperOptions struct {
	Search        string
	Location      string
	DaysSincePost int
	Url           string
	OverrideOpts  map[enum.ScraperName]ScraperOptions
}

type ScraperConfig struct {
	IsGUIRequired           bool
	StartUrl                string
	Timeout                 time.Duration
	HasResultsScraperConfig HasResultsScraperConfig
	GetResultsScraperConfig GetResultsScraperConfig
}
type HasResultsScraperConfig struct {
	Selector         string
	MessageSubstring string
}
type GetResultsScraperConfig struct {
	Selector      string
	ResultHandler func(ctx context.Context, xpath string) model.Job
}
