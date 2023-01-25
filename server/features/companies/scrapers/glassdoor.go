package scrapers

import (
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/companies/filters"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/model"
	"math"
	"net/url"
	"strconv"
	"strings"
	"time"
)

var glassdoorRatingSelector = `//div[@data-test="statsLink"]/div[1]`

/**
 * Takes a company with a name and fetches the rest of the details
 */
func ScrapeCompanyDetails(companyName string) model.Company {
	ctx, cancel := chromedp.NewContext(context.Background())
	ctx, cancel = context.WithTimeout(ctx, 1*time.Minute)
	defer cancel()

	var company model.Company
	db.Instance().FirstOrInit(&company, model.Company{
		CompanyName: companyName,
	})
	if company.ID != 0 {
		fmt.Println("Company already exists in database", company.CompanyName, company.Rating, company.Industry)
		return company
	}
	googleUrl := `https://www.google.com/search?q=` + url.QueryEscape(companyName) + `&as_sitesearch=www.glassdoor.com%2FOverview&nfpr=1`
	fmt.Println("Adding company:", companyName, "("+googleUrl+")")
	chromedp.Run(ctx,
		chromedp.Navigate(googleUrl),
		chromedp.AttributeValue(`//div[@id="search"]//a[contains(@href, "glassdoor.com/Overview")]`, `href`, &company.GlassdoorUrl, nil),
	)
	var ratingString string
	chromedp.Run(ctx,
		chromedp.Navigate(company.GlassdoorUrl),
		chromedp.TextContent(glassdoorRatingSelector, &ratingString),
		chromedp.TextContent(`//a[@data-test="employer-industry"]`, &company.Industry),
	)
	ratingFloat, _ := strconv.ParseFloat(ratingString, 64)
	company.Rating = math.Round(ratingFloat*100) / 100

	company.Industry = strings.TrimSpace(company.Industry)
	if !filters.GetFilteredIndustries()[company.Industry] {
		time.Sleep(5 * time.Second)
		chromedp.Run(ctx,
			chromedp.Click(`//div[@data-test="statsLink"]/div[2]`),
			chromedp.WaitReady(`//div[@id="DesktopTrendChart"]//div`),
			chromedp.InnerHTML(`//div[@id="DesktopTrendChart"]//div`, &company.RatingHTML),
		)
	}
	if company.RatingHTML != "" {
		db.Instance().Save(&company)
		fmt.Println("Persisted:", company.CompanyName, "(", company.Rating, "),", company.Industry)
	}
	return company
}
