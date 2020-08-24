# Job Search Aggregator

(alpha version - not yet ready for release)

This is a project for people who want to search multiple job sites using specific criteria. In a sense, it's a search adapter for similar job websites like Glassdoor, Indeed, Monster, ZipRecruiter, and more.

For now, this project aggregates 7 sites and can filter on the following criteria:

* Search Term
* Location (exact match only - may include radius later)
* Glassdoor rating threshold
* Job description matches
* [WIP] Direct hire only (no third party recruiters)

Other features include:

* Run multiple searches on different cities simultaneously
* Get background information about the hiring company, including their domain (i.e. Healthcare, Finance) and their Glassdoor rating over time
* Filtering companies (i.e. if they don't seem like the right fit)

## Tech Stack

The tech stack is dockerized and can be run with `docker-compose build` followed by `docker-compose up`.

The exception for now is Go, because additional work needs to be done for headless chrome to work in this environment. Go should be downloaded with `brew` or another package manager. The server can then be started with `cd server`, followed by `go run main.go`.

#### API

The API is written in Go, as is all the web scrapers for each job site. This will allow multiple scraping processes to run simultaneously, more quickly than Python or JavaScript.

#### Database

Data is stored in Postgres and retrieved with GraphQL APIs using Hasura.

#### Web App

Data is viewed through a web app written in NextJS (SSR) and Tailwind (CSS).
