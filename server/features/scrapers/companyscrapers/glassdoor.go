package companyscrapers

import (
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/model"
	"math"
	"net/url"
	"strconv"
	"strings"
	"time"
)

var glassdoorRatingSelector = `.v2__EIReviewsRatingsStylesV2__ratingNum.v2__EIReviewsRatingsStylesV2__large`

/**
 * Takes a company with a name and fetches the rest of the details
 */
func ScrapeCompanyDetails(companyName string) model.Company {
	ctx, cancel := chromedp.NewContext(context.Background())
	ctx, cancel = context.WithTimeout(ctx, 20*time.Second)
	defer cancel()

	var company model.Company
	db.Instance().FirstOrInit(&company, model.Company{
		CompanyName: companyName,
	})
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
		chromedp.TextContent(`//div[@class="infoEntity"][6]/span`, &company.Industry),
		chromedp.Click(glassdoorRatingSelector),
	)
	ratingFloat, _ := strconv.ParseFloat(ratingString, 64)
	company.Rating = math.Round(ratingFloat*100) / 100

	company.Industry = strings.TrimSpace(company.Industry)
	if company.Industry != "Staffing & Outsourcing" {
		time.Sleep(5 * time.Second)
		chromedp.Run(ctx,
			chromedp.OuterHTML(`#DesktopTrendChart svg`, &company.RatingHTML),
		)
	}
	fmt.Println("Found:", company.CompanyName, "(", company.Rating, "),", company.Industry)
	db.Instance().Save(&company)
	return company
}
