package scrapers

import (
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"strings"
)

type ScraperIndeed struct {
}

func (scraper ScraperIndeed) Name() enum.ScraperName {
	return enum.Indeed
}

func (scraper ScraperIndeed) Scrape(options ScraperOptions) []model.Job {
	var searchFormatter = strings.NewReplacer(" ", "%20")
	config := ScraperConfig{
		IsGUIRequired: true,
		StartUrl:      `https://www.indeed.com/jobs?q=` + searchFormatter.Replace(options.Search) + `&l=` + searchFormatter.Replace(options.Location) + `&radius=10&fromage=` + fmt.Sprint(options.DaysSincePost),
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `.resultContent`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//h2[contains(@class, "jobTitle")]/a`, &job.Title),
					chromedp.AttributeValue(xpath+`//h2[contains(@class, "jobTitle")]/a`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`//span[contains(@class, "companyName")]`, &job.Company.CompanyName),
					chromedp.Click(xpath),
					chromedp.TextContent(`#jobDescriptionText`, &job.Description),
					chromedp.OuterHTML(`#jobDescriptionText`, &job.DescriptionHTML),
				)
				job.Title = strings.TrimSpace(job.Title)
				job.Company.CompanyName = strings.TrimSpace(job.Company.CompanyName)
				job.Url = `https://www.indeed.com` + job.Url
				return job
			},
		},
	}
	return GetResults(config)
}
