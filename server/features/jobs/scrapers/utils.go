package scrapers

import (
	"context"
	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/companies/scrapers"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/crud"
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/dskline/jobsearch/features/debug/log"
	"github.com/dskline/jobsearch/features/jobs/filters"
	"strings"
	"time"
)

var disableHeadlessOpts = append(chromedp.DefaultExecAllocatorOptions[:],
	chromedp.Flag("headless", false),
	chromedp.Flag("disable-gpu", false),
	chromedp.Flag("enable-automation", false),
	chromedp.Flag("disable-extensions", false),
)

func PageHasResults(config ScraperConfig) bool {
	if config.HasResultsScraperConfig.Selector == "" {
		return true
	}

	ctx := context.Background()
	var cancel context.CancelFunc
	if config.IsGUIRequired {
		ctx, cancel = chromedp.NewExecAllocator(ctx, disableHeadlessOpts...)
	}
	ctx, cancel = chromedp.NewContext(ctx)
	// 	ctx := scrapers.GetChromeDriver()
	// 	var cancel context.CancelFunc
	ctx, cancel = context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	var message string
	chromedp.Run(ctx,
		chromedp.Navigate(config.StartUrl),
		chromedp.WaitReady(config.HasResultsScraperConfig.Selector),
		chromedp.TextContent(config.HasResultsScraperConfig.Selector, &message),
	)
	ctx.Done()

	if strings.Contains(message, config.HasResultsScraperConfig.MessageSubstring) {
		log.Info("Page displayed a no results message. Skipping...")
		return false
	}
	return true
}

func GetResults(config ScraperConfig) []model.Job {
	log.Info("Scraping %s", config.StartUrl)
	var jobs []model.Job

	if !PageHasResults(config) {
		return jobs
	}

	ctx := context.Background()
	var cancel context.CancelFunc
	if config.IsGUIRequired {
		ctx, cancel = chromedp.NewExecAllocator(ctx, disableHeadlessOpts...)
	}
	ctx, cancel = chromedp.NewContext(ctx)
	ctx, cancel = context.WithTimeout(ctx, 1*time.Minute)
	defer cancel()

	queryOption := chromedp.ByQueryAll
	if config.GetResultsScraperConfig.Selector[0] == '/' {
		queryOption = chromedp.BySearch
	}
	var nodes []*cdp.Node
	chromedp.Run(ctx,
		chromedp.Navigate(config.StartUrl),
		chromedp.WaitReady(config.GetResultsScraperConfig.Selector, queryOption),
		chromedp.Nodes(config.GetResultsScraperConfig.Selector, &nodes, queryOption),
	)
	log.Info("Found %d results", len(nodes))
	for i, n := range nodes {
		job := config.GetResultsScraperConfig.ResultHandler(ctx, n.FullXPathByID())
		log.Info("[%d] %s: %s", i+1, job.Company.CompanyName, job.Title)
		log.Debug("%s", job.Url)
		jobs = append(jobs, job)
	}
	ctx.Done()

	var companyNames = make([]string, 0)
	for _, job := range jobs {
		companyNames = append(companyNames, job.Company.CompanyName)
	}
	var companies = crud.RetrieveByCompanyNames(companyNames)

	// filter jobs by description
	jobs = filters.FilterByKeywordScore{}.Filter(jobs)

	// if the description is acceptable, get more details about the company
	for i, job := range jobs {
		var persistedCompany = companies[job.Company.CompanyName]
		if persistedCompany.Industry == "" {
			jobs[i].Company = scrapers.ScrapeCompanyDetails(job.Company.CompanyName)
			companies[jobs[i].Company.CompanyName] = jobs[i].Company
		} else {
			jobs[i].Company = persistedCompany
		}
	}
	jobs = filters.FilterByIndustry{}.Filter(jobs)

	// register the event
	var scraperEvent = model.ScraperEvent{
		Url:          config.StartUrl,
		JobsFound:    len(nodes),
		JobsFiltered: len(nodes) - len(jobs),
	}
	db.Instance().Create(&scraperEvent)

	return jobs
}
