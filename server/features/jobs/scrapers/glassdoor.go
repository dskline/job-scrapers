package scrapers

import (
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
)

type ScraperGlassdoorJobs struct {
}

func (scraper ScraperGlassdoorJobs) Name() enum.ScraperName {
	return enum.Glassdoor
}

func (scraper ScraperGlassdoorJobs) Scrape(options ScraperOptions) []model.Job {
	startUrl := options.OverrideOpts[enum.Glassdoor].Url

	var locationParam = ""
	if options.Location == "remote" {
		locationParam = "&remoteWorkType=1"
	} else {
		locationParam = "&radius=10"
	}
	config := ScraperConfig{
		StartUrl: startUrl + `minRating=3.5&fromAge=` + fmt.Sprint(options.DaysSincePost) + locationParam,
		HasResultsScraperConfig: HasResultsScraperConfig{
			Selector:         "div[@data-test='zero-results-page']",
			MessageSubstring: "No results",
		},
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `//li[contains(@class, "react-job-listing")]/div[2]`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`/div[1]/a`, &job.Company.CompanyName),
					chromedp.AttributeValue(xpath+`/a`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`/a`, &job.Title),
					chromedp.Click(xpath),
					chromedp.TextContent(".jobDescriptionContent", &job.Description),
					chromedp.OuterHTML(".jobDescriptionContent", &job.DescriptionHTML),
				)
				if job.Url[0] == '/' {
					job.Url = "https://www.glassdoor.com" + job.Url
				}
				return job
			},
		},
	}
	return GetResults(config)
}
