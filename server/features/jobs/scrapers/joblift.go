package scrapers

import (
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"strings"
)

type ScraperJoblift struct {
}

func (scraper ScraperJoblift) Name() enum.ScraperName {
	return enum.Joblift
}

func (scraper ScraperJoblift) Scrape(options ScraperOptions) []model.Job {
	var searchFormatter = strings.NewReplacer(" ", "%20")
	timeQuery := "-the-last-24-hours"
	if options.DaysSincePost > 1 {
		timeQuery = "-the-last-" + fmt.Sprint(options.DaysSincePost) + "-days"
	}
	config := ScraperConfig{
		StartUrl: `https://joblift.com/Jobs-within-` + searchFormatter.Replace(options.Location) + `-for-` + searchFormatter.Replace(options.Search) + timeQuery + `-without-perimeter`,
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `//div[@data-testid="jobItem"]//a[contains(@class, "jobLink")]`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//div[@data-testid="jobTitleLink"]`, &job.Title),
					chromedp.AttributeValue(xpath, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`//div[@data-testid="jobItemCompany"]`, &job.Company.CompanyName),
					chromedp.Click(xpath),
					chromedp.TextContent(`//div[@class="dscr-details"]`, &job.Description),
					chromedp.InnerHTML(`//div[@class="dscr-details"]`, &job.DescriptionHTML),
				)
				job.Url = "https://joblift.com" + strings.Replace(job.Url, " ", "%20", -1)
				job.Title = strings.TrimSpace(job.Title)
				return job
			},
		},
	}
	return GetResults(config)
}
