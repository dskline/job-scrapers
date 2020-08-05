package jobscrapers

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
	config := ScraperConfig{
		IsGUIRequired: true,
		StartUrl:      `https://www.google.com/search?q=` + searchFormatter.Replace(options.Search) + `+durham+nc&oq=google+jobs&ibp=htl;jobs&htivrt=jobs&sxsrf=ALeKk02PjNmmGZASJRmTOjwPSJmqtrOafg:1595424508251#fpstate=tldetail&htivrt=jobs&htichips=date_posted:today,city:8WYPEnHkrIl-8kaKidp64Q%3D%3D&htischips=date_posted;today,city;8WYPEnHkrIl-8kaKidp64Q%3D%3D:Durham_comma_%20NC`,
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `[role="treeitem"]`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//div[@role="heading"]`, &job.Title),
					chromedp.TextContent(xpath+`//div[@role="heading"]/following-sibling::div[1]/div/div[1]`, &job.Company.CompanyName),
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
