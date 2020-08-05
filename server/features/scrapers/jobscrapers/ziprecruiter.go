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

type ScraperZipRecruiter struct {
}

func (scraper ScraperZipRecruiter) Name() enum.ScraperName {
	return enum.ZipRecruiter
}

func (scraper ScraperZipRecruiter) Scrape(options ScraperOptions) []model.Job {
	var searchFormatter = strings.NewReplacer(" ", "%20")
	config := ScraperConfig{
		IsGUIRequired: true,
		StartUrl:      `https://www.ziprecruiter.com/candidate/search?search=` + searchFormatter.Replace(options.Search) + `&location=` + searchFormatter.Replace(options.Location) + `&radius=10&days=` + fmt.Sprint(options.DaysSincePost),
		HasResultsScraperConfig: HasResultsScraperConfig{
			Selector:         `.no-results h2`,
			MessageSubstring: "No jobs found.",
		},
		GetResultsScraperConfig: GetResultsScraperConfig{
			Selector: `.job_results .job_content`,
			ResultHandler: func(ctx context.Context, xpath string) model.Job {
				var job model.Job
				chromedp.Run(ctx,
					chromedp.TextContent(xpath+`//span[@class="just_job_title"]`, &job.Title),
					chromedp.TextContent(xpath+`//a[@class="t_org_link name"]`, &job.Company.CompanyName),
					chromedp.AttributeValue(xpath+`//a[@class="job_link t_job_link"]`, `href`, &job.Url, nil),
					chromedp.TextContent(xpath+`//p[@class="job_snippet"]`, &job.Description),
				)
				job.Description = strings.TrimSpace(job.Description)
				job.DescriptionHTML = job.Description

				ctx2, cancel := chromedp.NewContext(context.Background())
				ctx2, cancel = context.WithTimeout(ctx2, 10*time.Second)
				defer cancel()

				chromedp.Run(ctx2,
					chromedp.Navigate(job.Url),
					chromedp.TextContent(`.jobDescriptionSection`, &job.Description),
					chromedp.OuterHTML(`.jobDescriptionSection`, &job.DescriptionHTML),
				)
				return job
			},
		},
	}
	return GetResults(config)
}
