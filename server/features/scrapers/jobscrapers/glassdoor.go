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

type ScraperGlassdoorJobs struct {
}

func (scraper ScraperGlassdoorJobs) Name() enum.ScraperName {
	return enum.Glassdoor
}

func (scraper ScraperGlassdoorJobs) Scrape(options ScraperOptions) []model.Job {
	startUrl := options.OverrideOpts[enum.Glassdoor].Url
	config := ScraperConfig{
		StartUrl: startUrl + `radius=10&minRating=3.5&fromAge=` + fmt.Sprint(options.DaysSincePost),
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

func GetGlassdoorRedirectUrl(options ScraperOptions) string {
	fmt.Println("Retrieving Glassdoor Redirect URL")
	ctx, cancel := chromedp.NewExecAllocator(context.Background(), disableHeadlessOpts...)
	ctx, cancel = chromedp.NewContext(ctx)
	ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	var searchFormatter = strings.NewReplacer(" ", "+")
	startUrl := `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=` + searchFormatter.Replace(options.Search) + `&fromAge=` + fmt.Sprint(options.DaysSincePost) + `&radius=10&minRating=3.5`
	fmt.Println(startUrl)
	chromedp.Run(ctx,
		chromedp.Navigate(startUrl),
		chromedp.SendKeys(`input[id="sc.location"]`, options.Location),
		chromedp.Click(`#HeroSearchButton`),
		chromedp.Sleep(5*time.Second),
		chromedp.Location(&startUrl),
	)
	startUrl += "&"
	return startUrl
}
