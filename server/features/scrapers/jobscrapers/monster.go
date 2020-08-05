package jobscrapers

import (
	"context"
	"fmt"
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
	var searchFormatter = strings.NewReplacer(" ", "-", ",", "__2C")
	config := ScraperConfig{
		StartUrl: `https://www.monster.com/jobs/search/?q=` + searchFormatter.Replace(options.Search) + `&intcid=skr_navigation_nhpso_searchMain&where=` + searchFormatter.Replace(options.Location) + `&rad=10&tm=` + fmt.Sprint(options.DaysSincePost),
		HasResultsScraperConfig: HasResultsScraperConfig{
			Selector:         ".navigation-content .title h1",
			MessageSubstring: "we didn't find any jobs matching your criteria",
		},
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `#SearchResults section.card-content[data-jobid]`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//header//a`, &job.Title),
					chromedp.AttributeValue(xpath+`//header//a`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`//div[@class="company"]/span[@class="name"]`, &job.Company.CompanyName),
				)
				job.Title = strings.TrimSpace(job.Title)

				/**
				 * Fetch job description from the next page
				 */
				ctx2, cancel := chromedp.NewContext(context.Background())
				ctx2, cancel = context.WithTimeout(ctx2, 10*time.Second)
				defer cancel()
				chromedp.Run(ctx2,
					chromedp.Navigate(job.Url),
					chromedp.TextContent(`.job-description`, &job.Description),
					chromedp.InnerHTML(`.job-description`, &job.DescriptionHTML),
				)
				return job
			},
		},
	}
	return GetResults(config)
}
