package scrapers

import (
	"github.com/dskline/jobsearch/features/companies/scrapers"
	"github.com/dskline/jobsearch/features/db"
	"github.com/dskline/jobsearch/features/db/crud"
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/dskline/jobsearch/features/debug/log"
	"github.com/dskline/jobsearch/features/jobs/filters"
)

func ScrapeJobs(options ScraperOptions) {
	if options.Scrapers == nil {
		options.Scrapers = []JobScraper{
			//ScraperFindJobs{}, Finds too many unrelated matches
			ScraperGlassdoorJobs{},
			//ScraperGoogleJobs{},
			//ScraperIndeed{},
			//ScraperJoblift{},
			//ScraperMonster{},
			//ScraperZipRecruiter{},
		}
	}
	if options.OverrideOpts == nil {
		options.OverrideOpts = map[enum.ScraperName]ScraperOptions{
			enum.Glassdoor: {
				Url: "https://www.glassdoor.com/Job/remote-react-developer-jobs-SRCH_IL.0,6_IS11047_KO7,22.htm?",
			},
		}
	}
	if options.DaysSincePost == 0 {
		options.DaysSincePost = 1
	}
	for _, scraper := range options.Scrapers {
		log.Info("Starting scraper: %s", scraper.Name())
		var jobs = scraper.Scrape(options)

		var companyNames = make([]string, 0)
		for _, job := range jobs {
			companyNames = append(companyNames, job.Company.CompanyName)
		}
		var companies = crud.RetrieveByCompanyNames(companyNames)
		jobs = filters.FilterByKeywordScore{}.Filter(jobs)
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
		for _, job := range jobs {
			job.Scraper = scraper.Name()
			db.Instance().Create(&job)
		}
	}
}
