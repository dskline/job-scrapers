package jobscrapers

import (
	"fmt"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/dskline/jobsearch/features/scrapers/companyscrapers"
)

func ScrapeJobs(scrapers []JobScraper) {
	if scrapers == nil {
		scrapers = []JobScraper{
			//ScraperFindJobs{}, Finds too many unrelated matches
			ScraperGlassdoorJobs{},
			ScraperGoogleJobs{},
			ScraperIndeed{},
			ScraperMonster{},
			ScraperJoblift{},
			ScraperZipRecruiter{},
		}
	}
	options := ScraperOptions{
		Search:        "React Developer",
		Location:      "Durham, NC",
		DaysSincePost: 1,
		OverrideOpts: map[enum.ScraperName]ScraperOptions{
			enum.Glassdoor: {
				Url: "https://www.glassdoor.com/Job/durham-react-developer-jobs-SRCH_IL.0,6_IC1138697_KO7,22.htm?",
			},
		},
	}
	for _, scraper := range scrapers {
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
