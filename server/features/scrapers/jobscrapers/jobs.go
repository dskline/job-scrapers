package jobscrapers

import (
	"fmt"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/dskline/jobsearch/features/scrapers/companyscrapers"
)

func ScrapeJobs(options ScraperOptions) {
	if options.Scrapers == nil {
		options.Scrapers = []JobScraper{
			//ScraperFindJobs{}, Finds too many unrelated matches
			ScraperGlassdoorJobs{},
			ScraperGoogleJobs{},
			ScraperIndeed{},
			ScraperMonster{},
			ScraperJoblift{},
			ScraperZipRecruiter{},
		}
	}
	if options.OverrideOpts == nil {
		options.OverrideOpts = map[enum.ScraperName]ScraperOptions{
			enum.Glassdoor: {
				Url: "https://www.glassdoor.com/Job/durham-react-developer-jobs-SRCH_IL.0,6_IC1138697_KO7,22.htm?",
			},
		}
	}
	if options.DaysSincePost == 0 {
		options.DaysSincePost = 1
	}
	for _, scraper := range options.Scrapers {
		fmt.Println("Starting scraper:", scraper.Name())
		for _, job := range scraper.Scrape(options) {
			var persistedCompany model.Company
			db.Instance().Where(&model.Company{CompanyName: job.Company.CompanyName}).First(&persistedCompany)
			if persistedCompany.Industry == "" {
				job.Company = companyscrapers.ScrapeCompanyDetails(job.Company.CompanyName)
			} else {
				job.Company = persistedCompany
			}
			if job.Company.Industry != "Staffing & Outsourcing" {
				job.Scraper = scraper.Name()
				db.Instance().Create(&job)
			}
		}
	}
}
