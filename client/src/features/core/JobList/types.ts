export type Company = {
  id: string,
  name: string,
  industry: string,
  rating: number,
  ratingHtml: string,
  glassdoorUrl: string
};

export type Job = {
  company: Company,
  title: string,
  scraper: string,
  url: string
};

export type JobListQueryResponse = {
  jobs: Array<Job>
};
