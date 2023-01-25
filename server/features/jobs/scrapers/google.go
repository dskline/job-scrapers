package scrapers

import (
	"context"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"strings"
)

type ScraperGoogleJobs struct {
}

func (scraper ScraperGoogleJobs) Name() enum.ScraperName {
	return enum.Google
}

func (scraper ScraperGoogleJobs) Scrape(options ScraperOptions) []model.Job {
	var searchFormatter = strings.NewReplacer(" ", "+")

	var locationParams = ""
	if options.Location == "remote" {
		locationParams = "&htiltype=1"
	} else {
		locationParams = "+" + searchFormatter.Replace(options.Location)
	}
	config := ScraperConfig{
		IsGUIRequired: true,
		StartUrl:      `https://www.google.com/search?q=` + searchFormatter.Replace(options.Search) + locationParams + `&oq=google+jobs&ibp=htl;jobs&htivrt=jobs&sxsrf=ALeKk02PjNmmGZASJRmTOjwPSJmqtrOafg:1595424508251#fpstate=tldetail&htivrt=jobs&htischips=date_posted;today`,
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `//div[@role="treeitem"]/div/div`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`/div[2]/div[2]`, &job.Title),
					chromedp.TextContent(xpath+`/div[3]/div/div[1]`, &job.Company.CompanyName),
					chromedp.Click(xpath),
					chromedp.Location(&job.Url),
					chromedp.TextContent(`//div[@jscontroller]/span[@style="line-height:1.5em"]`, &job.Description),
					chromedp.OuterHTML(`//div[@jscontroller]/span[@style="line-height:1.5em"]`, &job.DescriptionHTML),
				)
				return job
			},
		},
	}
	return GetResults(config)
}
