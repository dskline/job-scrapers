package scrapers

import (
	"context"
	"fmt"
	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db/model"
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
		fmt.Println("Page displayed a no results message")
		return false
	}
	return true
}

func GetResults(config ScraperConfig) []model.Job {
	fmt.Println(config.StartUrl)
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
	fmt.Println(len(nodes), "results found")
	for _, n := range nodes {
		job := config.GetResultsScraperConfig.ResultHandler(ctx, n.FullXPathByID())
		fmt.Println(job.Title, "|", job.Company.CompanyName, "|", job.Url)
		jobs = append(jobs, job)
	}
	ctx.Done()

	return jobs
}
