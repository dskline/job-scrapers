package scrapers

import (
	"context"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"strings"
)

type ScraperFindJobs struct {
}

func (scraper ScraperFindJobs) Name() enum.ScraperName {
	return enum.FindJobs
}

func (scraper ScraperFindJobs) Scrape(options ScraperOptions) []model.Job {
	var searchFormatter = strings.NewReplacer(" ", "%20")
	var timeQuery string
	if options.DaysSincePost == 1 {
		timeQuery = "last_day"
	} else if options.DaysSincePost <= 3 {
		timeQuery = "last_3_days"
	} else if options.DaysSincePost <= 7 {
		timeQuery = "last_week"
	}

	config := ScraperConfig{
		StartUrl: `https://find.jobs/search?keyword=` + searchFormatter.Replace(options.Search) + `&location=` + searchFormatter.Replace(options.Location) + `&distance=10&date_added=` + timeQuery,
		HasResultsScraperConfig: HasResultsScraperConfig{
			Selector:         ".search-result-container .card-body > h4",
			MessageSubstring: "We can't seem to find any jobs",
		},
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: ".search-job-result",
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//a[@class="job_title"]`, &job.Title),
					chromedp.AttributeValue(xpath+`//a[@class="job_title"]`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`//a[@title="Job Details"]`, &job.Company.CompanyName),
				)
				job.Url = "https://find.jobs" + job.Url
				job.Title = strings.TrimSpace(job.Title)
				job.Company.CompanyName = job.Company.CompanyName[:strings.Index(job.Company.CompanyName, " •")]
				return job
			},
		},
	}
	return GetResults(config)
}
