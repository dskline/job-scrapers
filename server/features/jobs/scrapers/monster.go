package scrapers

import (
	"context"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"strings"
	"time"
)

type ScraperMonster struct {
}

func (scraper ScraperMonster) Name() enum.ScraperName {
	return enum.Monster
}

func (scraper ScraperMonster) Scrape(options ScraperOptions) []model.Job {
	var searchFormatter = strings.NewReplacer(" ", "+", ",", "__2C")
	var location = ``
	if options.Location != `` {
		location = `&where=` + searchFormatter.Replace(options.Location) + `&rd=10`
	}
	var recency = ``
	if options.DaysSincePost == 1 {
		recency = `&recency=today`
	}

	config := ScraperConfig{
		StartUrl: `https://www.monster.com/jobs/search/?q=` + searchFormatter.Replace(options.Search) + location + recency,
		HasResultsScraperConfig: HasResultsScraperConfig{
			Selector:         `h3[data-testid="messageTitle"]`,
			MessageSubstring: "Sorry, no jobs found for that search",
		},
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `.infinite-scroll-component > div > div[tabindex="0"]`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`/a//div[@data-testid="svx_jobCard-title"]`, &job.Title),
					chromedp.AttributeValue(xpath+`/a`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`/a//h3[@data-testid="svx_jobCard-company"]`, &job.Company.CompanyName),
				)
				job.Title = strings.TrimSpace(job.Title)
				job.Url = `https://` + job.Url[2:] // remove the leading "//"

				/**
				 * Fetch job description from the next page
				 */
				ctx2, cancel := chromedp.NewContext(context.Background())
				ctx2, cancel = context.WithTimeout(ctx2, 10*time.Second)
				defer cancel()
				chromedp.Run(ctx2,
					chromedp.Navigate(job.Url),
					chromedp.TextContent(`//div[contains(@class, "descriptionstyles__DescriptionContainer")]`, &job.Description),
					chromedp.InnerHTML(`//div[contains(@class, "descriptionstyles__DescriptionContainer")]`, &job.DescriptionHTML),
				)
				ctx2.Done()

				return job
			},
		},
	}
	return GetResults(config)
}
