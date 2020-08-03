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
		HasResultsScraperConfig: HasResultsScraperConfig{
			Selector:         ".noResultsHint",
			MessageSubstring: "We couldn't find anything",
		},
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `//div[@class="searchresult__resultlist"]/div[following-sibling::div[@class="divider"]]`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//a[@data-testid="jobTitleLink"]`, &job.Title),
					chromedp.AttributeValue(xpath+`//a[@data-testid="jobTitleLink"]`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`//div[@class="job__infos"]/span[1]`, &job.CompanyName),
				)
				job.Url = "https://joblift.com" + job.Url
				job.Title = strings.TrimSpace(job.Title)

				/**
				 * Fetch job description from the next page
				 */
				ctx2, cancel := chromedp.NewContext(context.Background())
				ctx2, cancel = context.WithTimeout(ctx2, 10*time.Second)
				defer cancel()
				chromedp.Run(ctx2,
					chromedp.Navigate(job.Url),
					chromedp.TextContent(`.dscr-details`, &job.Description),
					chromedp.InnerHTML(`.dscr-details`, &job.DescriptionHTML),
				)
				return job
			},
		},
	}
	return GetResults(config)
}
