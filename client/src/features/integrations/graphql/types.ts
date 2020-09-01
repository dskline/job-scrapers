/* eslint-disable camelcase */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  numeric: any,
  timestamptz: any
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>,
  _gt?: Maybe<Scalars['Int']>,
  _gte?: Maybe<Scalars['Int']>,
  _in?: Maybe<Array<Scalars['Int']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Int']>,
  _lte?: Maybe<Scalars['Int']>,
  _neq?: Maybe<Scalars['Int']>,
  _nin?: Maybe<Array<Scalars['Int']>>
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: Maybe<Scalars['String']>,
  _gt?: Maybe<Scalars['String']>,
  _gte?: Maybe<Scalars['String']>,
  _ilike?: Maybe<Scalars['String']>,
  _in?: Maybe<Array<Scalars['String']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _like?: Maybe<Scalars['String']>,
  _lt?: Maybe<Scalars['String']>,
  _lte?: Maybe<Scalars['String']>,
  _neq?: Maybe<Scalars['String']>,
  _nilike?: Maybe<Scalars['String']>,
  _nin?: Maybe<Array<Scalars['String']>>,
  _nlike?: Maybe<Scalars['String']>,
  _nsimilar?: Maybe<Scalars['String']>,
  _similar?: Maybe<Scalars['String']>
};

/** columns and relationships of "companies" */
export type Companies = {
  __typename?: 'companies',
  company_name?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  glassdoor_url?: Maybe<Scalars['String']>,
  id: Scalars['Int'],
  industry?: Maybe<Scalars['String']>,
  /** An array relationship */
  jobs: Array<Jobs>,
  /** An aggregated array relationship */
  jobs_aggregate: JobsAggregate,
  rating?: Maybe<Scalars['numeric']>,
  rating_html?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  /** An array relationship */
  user_ignores: Array<UserIgnores>,
  /** An aggregated array relationship */
  user_ignores_aggregate: UserIgnoresAggregate
};

/** columns and relationships of "companies" */
export type CompaniesJobsArgs = {
  distinct_on?: Maybe<Array<JobsSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<JobsOrderBy>>,
  where?: Maybe<JobsBoolExp>
};

/** columns and relationships of "companies" */
export type CompaniesJobsAggregateArgs = {
  distinct_on?: Maybe<Array<JobsSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<JobsOrderBy>>,
  where?: Maybe<JobsBoolExp>
};

/** columns and relationships of "companies" */
export type CompaniesUserIgnoresArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** columns and relationships of "companies" */
export type CompaniesUserIgnoresAggregateArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** aggregated selection of "companies" */
export type CompaniesAggregate = {
  __typename?: 'companies_aggregate',
  aggregate?: Maybe<CompaniesAggregateFields>,
  nodes: Array<Companies>
};

/** aggregate fields of "companies" */
export type CompaniesAggregateFields = {
  __typename?: 'companies_aggregate_fields',
  avg?: Maybe<CompaniesAvgFields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<CompaniesMaxFields>,
  min?: Maybe<CompaniesMinFields>,
  stddev?: Maybe<CompaniesStddevFields>,
  stddev_pop?: Maybe<CompaniesStddevPopFields>,
  stddev_samp?: Maybe<CompaniesStddevSampFields>,
  sum?: Maybe<CompaniesSumFields>,
  var_pop?: Maybe<CompaniesVarPopFields>,
  var_samp?: Maybe<CompaniesVarSampFields>,
  variance?: Maybe<CompaniesVarianceFields>
};

/** aggregate fields of "companies" */
export type CompaniesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<CompaniesSelectColumn>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "companies" */
export type CompaniesAggregateOrderBy = {
  avg?: Maybe<CompaniesAvgOrderBy>,
  count?: Maybe<OrderBy>,
  max?: Maybe<CompaniesMaxOrderBy>,
  min?: Maybe<CompaniesMinOrderBy>,
  stddev?: Maybe<CompaniesStddevOrderBy>,
  stddev_pop?: Maybe<CompaniesStddevPopOrderBy>,
  stddev_samp?: Maybe<CompaniesStddevSampOrderBy>,
  sum?: Maybe<CompaniesSumOrderBy>,
  var_pop?: Maybe<CompaniesVarPopOrderBy>,
  var_samp?: Maybe<CompaniesVarSampOrderBy>,
  variance?: Maybe<CompaniesVarianceOrderBy>
};

/** input type for inserting array relation for remote table "companies" */
export type CompaniesArrRelInsertInput = {
  data: Array<CompaniesInsertInput>,
  on_conflict?: Maybe<CompaniesOnConflict>
};

/** aggregate avg on columns */
export type CompaniesAvgFields = {
  __typename?: 'companies_avg_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by avg() on columns of table "companies" */
export type CompaniesAvgOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** Boolean expression to filter rows from the table "companies". All fields are combined with a logical 'AND'. */
export type CompaniesBoolExp = {
  _and?: Maybe<Array<Maybe<CompaniesBoolExp>>>,
  _not?: Maybe<CompaniesBoolExp>,
  _or?: Maybe<Array<Maybe<CompaniesBoolExp>>>,
  company_name?: Maybe<StringComparisonExp>,
  created_at?: Maybe<TimestamptzComparisonExp>,
  deleted_at?: Maybe<TimestamptzComparisonExp>,
  glassdoor_url?: Maybe<StringComparisonExp>,
  id?: Maybe<IntComparisonExp>,
  industry?: Maybe<StringComparisonExp>,
  jobs?: Maybe<JobsBoolExp>,
  rating?: Maybe<NumericComparisonExp>,
  rating_html?: Maybe<StringComparisonExp>,
  updated_at?: Maybe<TimestamptzComparisonExp>,
  user_ignores?: Maybe<UserIgnoresBoolExp>
};

/** unique or primary key constraints on table "companies" */
export enum CompaniesConstraint {
  /** unique or primary key constraint */
  CompaniesPkey = 'companies_pkey',
}

/** input type for incrementing integer column in table "companies" */
export type CompaniesIncInput = {
  id?: Maybe<Scalars['Int']>,
  rating?: Maybe<Scalars['numeric']>
};

/** input type for inserting data into table "companies" */
export type CompaniesInsertInput = {
  company_name?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  glassdoor_url?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  industry?: Maybe<Scalars['String']>,
  jobs?: Maybe<JobsArrRelInsertInput>,
  rating?: Maybe<Scalars['numeric']>,
  rating_html?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  user_ignores?: Maybe<UserIgnoresArrRelInsertInput>
};

/** aggregate max on columns */
export type CompaniesMaxFields = {
  __typename?: 'companies_max_fields',
  company_name?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  glassdoor_url?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  industry?: Maybe<Scalars['String']>,
  rating?: Maybe<Scalars['numeric']>,
  rating_html?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>
};

/** order by max() on columns of table "companies" */
export type CompaniesMaxOrderBy = {
  company_name?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  glassdoor_url?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  industry?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>,
  rating_html?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>
};

/** aggregate min on columns */
export type CompaniesMinFields = {
  __typename?: 'companies_min_fields',
  company_name?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  glassdoor_url?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  industry?: Maybe<Scalars['String']>,
  rating?: Maybe<Scalars['numeric']>,
  rating_html?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>
};

/** order by min() on columns of table "companies" */
export type CompaniesMinOrderBy = {
  company_name?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  glassdoor_url?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  industry?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>,
  rating_html?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>
};

/** response of any mutation on the table "companies" */
export type CompaniesMutationResponse = {
  __typename?: 'companies_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<Companies>
};

/** input type for inserting object relation for remote table "companies" */
export type CompaniesObjRelInsertInput = {
  data: CompaniesInsertInput,
  on_conflict?: Maybe<CompaniesOnConflict>
};

/** on conflict condition type for table "companies" */
export type CompaniesOnConflict = {
  constraint: CompaniesConstraint,
  update_columns: Array<CompaniesUpdateColumn>,
  where?: Maybe<CompaniesBoolExp>
};

/** ordering options when selecting data from "companies" */
export type CompaniesOrderBy = {
  company_name?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  glassdoor_url?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  industry?: Maybe<OrderBy>,
  jobs_aggregate?: Maybe<JobsAggregateOrderBy>,
  rating?: Maybe<OrderBy>,
  rating_html?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  user_ignores_aggregate?: Maybe<UserIgnoresAggregateOrderBy>
};

/** primary key columns input for table: "companies" */
export type CompaniesPkColumnsInput = {
  id: Scalars['Int']
};

/** select columns of table "companies" */
export enum CompaniesSelectColumn {
  /** column name */
  CompanyName = 'company_name',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  GlassdoorUrl = 'glassdoor_url',
  /** column name */
  Id = 'id',
  /** column name */
  Industry = 'industry',
  /** column name */
  Rating = 'rating',
  /** column name */
  RatingHtml = 'rating_html',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "companies" */
export type CompaniesSetInput = {
  company_name?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  glassdoor_url?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  industry?: Maybe<Scalars['String']>,
  rating?: Maybe<Scalars['numeric']>,
  rating_html?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>
};

/** aggregate stddev on columns */
export type CompaniesStddevFields = {
  __typename?: 'companies_stddev_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by stddev() on columns of table "companies" */
export type CompaniesStddevOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** aggregate stddev_pop on columns */
export type CompaniesStddevPopFields = {
  __typename?: 'companies_stddev_pop_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by stddev_pop() on columns of table "companies" */
export type CompaniesStddevPopOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** aggregate stddev_samp on columns */
export type CompaniesStddevSampFields = {
  __typename?: 'companies_stddev_samp_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by stddev_samp() on columns of table "companies" */
export type CompaniesStddevSampOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** aggregate sum on columns */
export type CompaniesSumFields = {
  __typename?: 'companies_sum_fields',
  id?: Maybe<Scalars['Int']>,
  rating?: Maybe<Scalars['numeric']>
};

/** order by sum() on columns of table "companies" */
export type CompaniesSumOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** update columns of table "companies" */
export enum CompaniesUpdateColumn {
  /** column name */
  CompanyName = 'company_name',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  GlassdoorUrl = 'glassdoor_url',
  /** column name */
  Id = 'id',
  /** column name */
  Industry = 'industry',
  /** column name */
  Rating = 'rating',
  /** column name */
  RatingHtml = 'rating_html',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type CompaniesVarPopFields = {
  __typename?: 'companies_var_pop_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by var_pop() on columns of table "companies" */
export type CompaniesVarPopOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** aggregate var_samp on columns */
export type CompaniesVarSampFields = {
  __typename?: 'companies_var_samp_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by var_samp() on columns of table "companies" */
export type CompaniesVarSampOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** aggregate variance on columns */
export type CompaniesVarianceFields = {
  __typename?: 'companies_variance_fields',
  id?: Maybe<Scalars['Float']>,
  rating?: Maybe<Scalars['Float']>
};

/** order by variance() on columns of table "companies" */
export type CompaniesVarianceOrderBy = {
  id?: Maybe<OrderBy>,
  rating?: Maybe<OrderBy>
};

/** columns and relationships of "jobs" */
export type Jobs = {
  __typename?: 'jobs',
  /** An object relationship */
  company?: Maybe<Companies>,
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  description: Scalars['String'],
  description_html: Scalars['String'],
  id: Scalars['Int'],
  scraper?: Maybe<Scalars['String']>,
  title: Scalars['String'],
  updated_at?: Maybe<Scalars['timestamptz']>,
  url: Scalars['String']
};

/** aggregated selection of "jobs" */
export type JobsAggregate = {
  __typename?: 'jobs_aggregate',
  aggregate?: Maybe<JobsAggregateFields>,
  nodes: Array<Jobs>
};

/** aggregate fields of "jobs" */
export type JobsAggregateFields = {
  __typename?: 'jobs_aggregate_fields',
  avg?: Maybe<JobsAvgFields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<JobsMaxFields>,
  min?: Maybe<JobsMinFields>,
  stddev?: Maybe<JobsStddevFields>,
  stddev_pop?: Maybe<JobsStddevPopFields>,
  stddev_samp?: Maybe<JobsStddevSampFields>,
  sum?: Maybe<JobsSumFields>,
  var_pop?: Maybe<JobsVarPopFields>,
  var_samp?: Maybe<JobsVarSampFields>,
  variance?: Maybe<JobsVarianceFields>
};

/** aggregate fields of "jobs" */
export type JobsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<JobsSelectColumn>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "jobs" */
export type JobsAggregateOrderBy = {
  avg?: Maybe<JobsAvgOrderBy>,
  count?: Maybe<OrderBy>,
  max?: Maybe<JobsMaxOrderBy>,
  min?: Maybe<JobsMinOrderBy>,
  stddev?: Maybe<JobsStddevOrderBy>,
  stddev_pop?: Maybe<JobsStddevPopOrderBy>,
  stddev_samp?: Maybe<JobsStddevSampOrderBy>,
  sum?: Maybe<JobsSumOrderBy>,
  var_pop?: Maybe<JobsVarPopOrderBy>,
  var_samp?: Maybe<JobsVarSampOrderBy>,
  variance?: Maybe<JobsVarianceOrderBy>
};

/** input type for inserting array relation for remote table "jobs" */
export type JobsArrRelInsertInput = {
  data: Array<JobsInsertInput>,
  on_conflict?: Maybe<JobsOnConflict>
};

/** aggregate avg on columns */
export type JobsAvgFields = {
  __typename?: 'jobs_avg_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by avg() on columns of table "jobs" */
export type JobsAvgOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** Boolean expression to filter rows from the table "jobs". All fields are combined with a logical 'AND'. */
export type JobsBoolExp = {
  _and?: Maybe<Array<Maybe<JobsBoolExp>>>,
  _not?: Maybe<JobsBoolExp>,
  _or?: Maybe<Array<Maybe<JobsBoolExp>>>,
  company?: Maybe<CompaniesBoolExp>,
  company_id?: Maybe<IntComparisonExp>,
  created_at?: Maybe<TimestamptzComparisonExp>,
  deleted_at?: Maybe<TimestamptzComparisonExp>,
  description?: Maybe<StringComparisonExp>,
  description_html?: Maybe<StringComparisonExp>,
  id?: Maybe<IntComparisonExp>,
  scraper?: Maybe<StringComparisonExp>,
  title?: Maybe<StringComparisonExp>,
  updated_at?: Maybe<TimestamptzComparisonExp>,
  url?: Maybe<StringComparisonExp>
};

/** unique or primary key constraints on table "jobs" */
export enum JobsConstraint {
  /** unique or primary key constraint */
  JobsPkey = 'jobs_pkey',
  /** unique or primary key constraint */
  JobsUrlKey = 'jobs_url_key',
}

/** input type for incrementing integer column in table "jobs" */
export type JobsIncInput = {
  company_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>
};

/** input type for inserting data into table "jobs" */
export type JobsInsertInput = {
  company?: Maybe<CompaniesObjRelInsertInput>,
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  description?: Maybe<Scalars['String']>,
  description_html?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  scraper?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  url?: Maybe<Scalars['String']>
};

/** aggregate max on columns */
export type JobsMaxFields = {
  __typename?: 'jobs_max_fields',
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  description?: Maybe<Scalars['String']>,
  description_html?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  scraper?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  url?: Maybe<Scalars['String']>
};

/** order by max() on columns of table "jobs" */
export type JobsMaxOrderBy = {
  company_id?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  description?: Maybe<OrderBy>,
  description_html?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  scraper?: Maybe<OrderBy>,
  title?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  url?: Maybe<OrderBy>
};

/** aggregate min on columns */
export type JobsMinFields = {
  __typename?: 'jobs_min_fields',
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  description?: Maybe<Scalars['String']>,
  description_html?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  scraper?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  url?: Maybe<Scalars['String']>
};

/** order by min() on columns of table "jobs" */
export type JobsMinOrderBy = {
  company_id?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  description?: Maybe<OrderBy>,
  description_html?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  scraper?: Maybe<OrderBy>,
  title?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  url?: Maybe<OrderBy>
};

/** response of any mutation on the table "jobs" */
export type JobsMutationResponse = {
  __typename?: 'jobs_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<Jobs>
};

/** input type for inserting object relation for remote table "jobs" */
export type JobsObjRelInsertInput = {
  data: JobsInsertInput,
  on_conflict?: Maybe<JobsOnConflict>
};

/** on conflict condition type for table "jobs" */
export type JobsOnConflict = {
  constraint: JobsConstraint,
  update_columns: Array<JobsUpdateColumn>,
  where?: Maybe<JobsBoolExp>
};

/** ordering options when selecting data from "jobs" */
export type JobsOrderBy = {
  company?: Maybe<CompaniesOrderBy>,
  company_id?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  description?: Maybe<OrderBy>,
  description_html?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  scraper?: Maybe<OrderBy>,
  title?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  url?: Maybe<OrderBy>
};

/** primary key columns input for table: "jobs" */
export type JobsPkColumnsInput = {
  id: Scalars['Int']
};

/** select columns of table "jobs" */
export enum JobsSelectColumn {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionHtml = 'description_html',
  /** column name */
  Id = 'id',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url',
}

/** input type for updating data in table "jobs" */
export type JobsSetInput = {
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  description?: Maybe<Scalars['String']>,
  description_html?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  scraper?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  url?: Maybe<Scalars['String']>
};

/** aggregate stddev on columns */
export type JobsStddevFields = {
  __typename?: 'jobs_stddev_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by stddev() on columns of table "jobs" */
export type JobsStddevOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** aggregate stddev_pop on columns */
export type JobsStddevPopFields = {
  __typename?: 'jobs_stddev_pop_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by stddev_pop() on columns of table "jobs" */
export type JobsStddevPopOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** aggregate stddev_samp on columns */
export type JobsStddevSampFields = {
  __typename?: 'jobs_stddev_samp_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by stddev_samp() on columns of table "jobs" */
export type JobsStddevSampOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** aggregate sum on columns */
export type JobsSumFields = {
  __typename?: 'jobs_sum_fields',
  company_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>
};

/** order by sum() on columns of table "jobs" */
export type JobsSumOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** update columns of table "jobs" */
export enum JobsUpdateColumn {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionHtml = 'description_html',
  /** column name */
  Id = 'id',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url',
}

/** aggregate var_pop on columns */
export type JobsVarPopFields = {
  __typename?: 'jobs_var_pop_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by var_pop() on columns of table "jobs" */
export type JobsVarPopOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** aggregate var_samp on columns */
export type JobsVarSampFields = {
  __typename?: 'jobs_var_samp_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by var_samp() on columns of table "jobs" */
export type JobsVarSampOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** aggregate variance on columns */
export type JobsVarianceFields = {
  __typename?: 'jobs_variance_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>
};

/** order by variance() on columns of table "jobs" */
export type JobsVarianceOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>
};

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root',
  /** delete data from the table: "companies" */
  delete_companies?: Maybe<CompaniesMutationResponse>,
  /** delete single row from the table: "companies" */
  delete_companies_by_pk?: Maybe<Companies>,
  /** delete data from the table: "jobs" */
  delete_jobs?: Maybe<JobsMutationResponse>,
  /** delete single row from the table: "jobs" */
  delete_jobs_by_pk?: Maybe<Jobs>,
  /** delete data from the table: "user_ignores" */
  delete_user_ignores?: Maybe<UserIgnoresMutationResponse>,
  /** delete single row from the table: "user_ignores" */
  delete_user_ignores_by_pk?: Maybe<UserIgnores>,
  /** delete data from the table: "users" */
  delete_users?: Maybe<UsersMutationResponse>,
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>,
  /** insert data into the table: "companies" */
  insert_companies?: Maybe<CompaniesMutationResponse>,
  /** insert a single row into the table: "companies" */
  insert_companies_one?: Maybe<Companies>,
  /** insert data into the table: "jobs" */
  insert_jobs?: Maybe<JobsMutationResponse>,
  /** insert a single row into the table: "jobs" */
  insert_jobs_one?: Maybe<Jobs>,
  /** insert data into the table: "user_ignores" */
  insert_user_ignores?: Maybe<UserIgnoresMutationResponse>,
  /** insert a single row into the table: "user_ignores" */
  insert_user_ignores_one?: Maybe<UserIgnores>,
  /** insert data into the table: "users" */
  insert_users?: Maybe<UsersMutationResponse>,
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>,
  /** update data of the table: "companies" */
  update_companies?: Maybe<CompaniesMutationResponse>,
  /** update single row of the table: "companies" */
  update_companies_by_pk?: Maybe<Companies>,
  /** update data of the table: "jobs" */
  update_jobs?: Maybe<JobsMutationResponse>,
  /** update single row of the table: "jobs" */
  update_jobs_by_pk?: Maybe<Jobs>,
  /** update data of the table: "user_ignores" */
  update_user_ignores?: Maybe<UserIgnoresMutationResponse>,
  /** update single row of the table: "user_ignores" */
  update_user_ignores_by_pk?: Maybe<UserIgnores>,
  /** update data of the table: "users" */
  update_users?: Maybe<UsersMutationResponse>,
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
};

/** mutation root */
export type MutationRootDeleteCompaniesArgs = {
  where: CompaniesBoolExp
};

/** mutation root */
export type MutationRootDeleteCompaniesByPkArgs = {
  id: Scalars['Int']
};

/** mutation root */
export type MutationRootDeleteJobsArgs = {
  where: JobsBoolExp
};

/** mutation root */
export type MutationRootDeleteJobsByPkArgs = {
  id: Scalars['Int']
};

/** mutation root */
export type MutationRootDeleteUserIgnoresArgs = {
  where: UserIgnoresBoolExp
};

/** mutation root */
export type MutationRootDeleteUserIgnoresByPkArgs = {
  id: Scalars['Int']
};

/** mutation root */
export type MutationRootDeleteUsersArgs = {
  where: UsersBoolExp
};

/** mutation root */
export type MutationRootDeleteUsersByPkArgs = {
  id: Scalars['Int']
};

/** mutation root */
export type MutationRootInsertCompaniesArgs = {
  objects: Array<CompaniesInsertInput>,
  on_conflict?: Maybe<CompaniesOnConflict>
};

/** mutation root */
export type MutationRootInsertCompaniesOneArgs = {
  object: CompaniesInsertInput,
  on_conflict?: Maybe<CompaniesOnConflict>
};

/** mutation root */
export type MutationRootInsertJobsArgs = {
  objects: Array<JobsInsertInput>,
  on_conflict?: Maybe<JobsOnConflict>
};

/** mutation root */
export type MutationRootInsertJobsOneArgs = {
  object: JobsInsertInput,
  on_conflict?: Maybe<JobsOnConflict>
};

/** mutation root */
export type MutationRootInsertUserIgnoresArgs = {
  objects: Array<UserIgnoresInsertInput>,
  on_conflict?: Maybe<UserIgnoresOnConflict>
};

/** mutation root */
export type MutationRootInsertUserIgnoresOneArgs = {
  object: UserIgnoresInsertInput,
  on_conflict?: Maybe<UserIgnoresOnConflict>
};

/** mutation root */
export type MutationRootInsertUsersArgs = {
  objects: Array<UsersInsertInput>,
  on_conflict?: Maybe<UsersOnConflict>
};

/** mutation root */
export type MutationRootInsertUsersOneArgs = {
  object: UsersInsertInput,
  on_conflict?: Maybe<UsersOnConflict>
};

/** mutation root */
export type MutationRootUpdateCompaniesArgs = {
  _inc?: Maybe<CompaniesIncInput>,
  _set?: Maybe<CompaniesSetInput>,
  where: CompaniesBoolExp
};

/** mutation root */
export type MutationRootUpdateCompaniesByPkArgs = {
  _inc?: Maybe<CompaniesIncInput>,
  _set?: Maybe<CompaniesSetInput>,
  pk_columns: CompaniesPkColumnsInput
};

/** mutation root */
export type MutationRootUpdateJobsArgs = {
  _inc?: Maybe<JobsIncInput>,
  _set?: Maybe<JobsSetInput>,
  where: JobsBoolExp
};

/** mutation root */
export type MutationRootUpdateJobsByPkArgs = {
  _inc?: Maybe<JobsIncInput>,
  _set?: Maybe<JobsSetInput>,
  pk_columns: JobsPkColumnsInput
};

/** mutation root */
export type MutationRootUpdateUserIgnoresArgs = {
  _inc?: Maybe<UserIgnoresIncInput>,
  _set?: Maybe<UserIgnoresSetInput>,
  where: UserIgnoresBoolExp
};

/** mutation root */
export type MutationRootUpdateUserIgnoresByPkArgs = {
  _inc?: Maybe<UserIgnoresIncInput>,
  _set?: Maybe<UserIgnoresSetInput>,
  pk_columns: UserIgnoresPkColumnsInput
};

/** mutation root */
export type MutationRootUpdateUsersArgs = {
  _inc?: Maybe<UsersIncInput>,
  _set?: Maybe<UsersSetInput>,
  where: UsersBoolExp
};

/** mutation root */
export type MutationRootUpdateUsersByPkArgs = {
  _inc?: Maybe<UsersIncInput>,
  _set?: Maybe<UsersSetInput>,
  pk_columns: UsersPkColumnsInput
};

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: Maybe<Scalars['numeric']>,
  _gt?: Maybe<Scalars['numeric']>,
  _gte?: Maybe<Scalars['numeric']>,
  _in?: Maybe<Array<Scalars['numeric']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['numeric']>,
  _lte?: Maybe<Scalars['numeric']>,
  _neq?: Maybe<Scalars['numeric']>,
  _nin?: Maybe<Array<Scalars['numeric']>>
};

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type QueryRoot = {
  __typename?: 'query_root',
  /** fetch data from the table: "companies" */
  companies: Array<Companies>,
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: CompaniesAggregate,
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk?: Maybe<Companies>,
  /** fetch data from the table: "jobs" */
  jobs: Array<Jobs>,
  /** fetch aggregated fields from the table: "jobs" */
  jobs_aggregate: JobsAggregate,
  /** fetch data from the table: "jobs" using primary key columns */
  jobs_by_pk?: Maybe<Jobs>,
  /** fetch data from the table: "user_ignores" */
  user_ignores: Array<UserIgnores>,
  /** fetch aggregated fields from the table: "user_ignores" */
  user_ignores_aggregate: UserIgnoresAggregate,
  /** fetch data from the table: "user_ignores" using primary key columns */
  user_ignores_by_pk?: Maybe<UserIgnores>,
  /** fetch data from the table: "users" */
  users: Array<Users>,
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate,
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
};

/** query root */
export type QueryRootCompaniesArgs = {
  distinct_on?: Maybe<Array<CompaniesSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompaniesOrderBy>>,
  where?: Maybe<CompaniesBoolExp>
};

/** query root */
export type QueryRootCompaniesAggregateArgs = {
  distinct_on?: Maybe<Array<CompaniesSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompaniesOrderBy>>,
  where?: Maybe<CompaniesBoolExp>
};

/** query root */
export type QueryRootCompaniesByPkArgs = {
  id: Scalars['Int']
};

/** query root */
export type QueryRootJobsArgs = {
  distinct_on?: Maybe<Array<JobsSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<JobsOrderBy>>,
  where?: Maybe<JobsBoolExp>
};

/** query root */
export type QueryRootJobsAggregateArgs = {
  distinct_on?: Maybe<Array<JobsSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<JobsOrderBy>>,
  where?: Maybe<JobsBoolExp>
};

/** query root */
export type QueryRootJobsByPkArgs = {
  id: Scalars['Int']
};

/** query root */
export type QueryRootUserIgnoresArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** query root */
export type QueryRootUserIgnoresAggregateArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** query root */
export type QueryRootUserIgnoresByPkArgs = {
  id: Scalars['Int']
};

/** query root */
export type QueryRootUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UsersOrderBy>>,
  where?: Maybe<UsersBoolExp>
};

/** query root */
export type QueryRootUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UsersOrderBy>>,
  where?: Maybe<UsersBoolExp>
};

/** query root */
export type QueryRootUsersByPkArgs = {
  id: Scalars['Int']
};

/** subscription root */
export type SubscriptionRoot = {
  __typename?: 'subscription_root',
  /** fetch data from the table: "companies" */
  companies: Array<Companies>,
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: CompaniesAggregate,
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk?: Maybe<Companies>,
  /** fetch data from the table: "jobs" */
  jobs: Array<Jobs>,
  /** fetch aggregated fields from the table: "jobs" */
  jobs_aggregate: JobsAggregate,
  /** fetch data from the table: "jobs" using primary key columns */
  jobs_by_pk?: Maybe<Jobs>,
  /** fetch data from the table: "user_ignores" */
  user_ignores: Array<UserIgnores>,
  /** fetch aggregated fields from the table: "user_ignores" */
  user_ignores_aggregate: UserIgnoresAggregate,
  /** fetch data from the table: "user_ignores" using primary key columns */
  user_ignores_by_pk?: Maybe<UserIgnores>,
  /** fetch data from the table: "users" */
  users: Array<Users>,
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate,
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
};

/** subscription root */
export type SubscriptionRootCompaniesArgs = {
  distinct_on?: Maybe<Array<CompaniesSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompaniesOrderBy>>,
  where?: Maybe<CompaniesBoolExp>
};

/** subscription root */
export type SubscriptionRootCompaniesAggregateArgs = {
  distinct_on?: Maybe<Array<CompaniesSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<CompaniesOrderBy>>,
  where?: Maybe<CompaniesBoolExp>
};

/** subscription root */
export type SubscriptionRootCompaniesByPkArgs = {
  id: Scalars['Int']
};

/** subscription root */
export type SubscriptionRootJobsArgs = {
  distinct_on?: Maybe<Array<JobsSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<JobsOrderBy>>,
  where?: Maybe<JobsBoolExp>
};

/** subscription root */
export type SubscriptionRootJobsAggregateArgs = {
  distinct_on?: Maybe<Array<JobsSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<JobsOrderBy>>,
  where?: Maybe<JobsBoolExp>
};

/** subscription root */
export type SubscriptionRootJobsByPkArgs = {
  id: Scalars['Int']
};

/** subscription root */
export type SubscriptionRootUserIgnoresArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** subscription root */
export type SubscriptionRootUserIgnoresAggregateArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** subscription root */
export type SubscriptionRootUserIgnoresByPkArgs = {
  id: Scalars['Int']
};

/** subscription root */
export type SubscriptionRootUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UsersOrderBy>>,
  where?: Maybe<UsersBoolExp>
};

/** subscription root */
export type SubscriptionRootUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UsersOrderBy>>,
  where?: Maybe<UsersBoolExp>
};

/** subscription root */
export type SubscriptionRootUsersByPkArgs = {
  id: Scalars['Int']
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>,
  _gt?: Maybe<Scalars['timestamptz']>,
  _gte?: Maybe<Scalars['timestamptz']>,
  _in?: Maybe<Array<Scalars['timestamptz']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['timestamptz']>,
  _lte?: Maybe<Scalars['timestamptz']>,
  _neq?: Maybe<Scalars['timestamptz']>,
  _nin?: Maybe<Array<Scalars['timestamptz']>>
};

/** columns and relationships of "user_ignores" */
export type UserIgnores = {
  __typename?: 'user_ignores',
  /** An object relationship */
  company?: Maybe<Companies>,
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  id: Scalars['Int'],
  updated_at?: Maybe<Scalars['timestamptz']>,
  /** An object relationship */
  user?: Maybe<Users>,
  user_id?: Maybe<Scalars['Int']>
};

/** aggregated selection of "user_ignores" */
export type UserIgnoresAggregate = {
  __typename?: 'user_ignores_aggregate',
  aggregate?: Maybe<UserIgnoresAggregateFields>,
  nodes: Array<UserIgnores>
};

/** aggregate fields of "user_ignores" */
export type UserIgnoresAggregateFields = {
  __typename?: 'user_ignores_aggregate_fields',
  avg?: Maybe<UserIgnoresAvgFields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<UserIgnoresMaxFields>,
  min?: Maybe<UserIgnoresMinFields>,
  stddev?: Maybe<UserIgnoresStddevFields>,
  stddev_pop?: Maybe<UserIgnoresStddevPopFields>,
  stddev_samp?: Maybe<UserIgnoresStddevSampFields>,
  sum?: Maybe<UserIgnoresSumFields>,
  var_pop?: Maybe<UserIgnoresVarPopFields>,
  var_samp?: Maybe<UserIgnoresVarSampFields>,
  variance?: Maybe<UserIgnoresVarianceFields>
};

/** aggregate fields of "user_ignores" */
export type UserIgnoresAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UserIgnoresSelectColumn>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "user_ignores" */
export type UserIgnoresAggregateOrderBy = {
  avg?: Maybe<UserIgnoresAvgOrderBy>,
  count?: Maybe<OrderBy>,
  max?: Maybe<UserIgnoresMaxOrderBy>,
  min?: Maybe<UserIgnoresMinOrderBy>,
  stddev?: Maybe<UserIgnoresStddevOrderBy>,
  stddev_pop?: Maybe<UserIgnoresStddevPopOrderBy>,
  stddev_samp?: Maybe<UserIgnoresStddevSampOrderBy>,
  sum?: Maybe<UserIgnoresSumOrderBy>,
  var_pop?: Maybe<UserIgnoresVarPopOrderBy>,
  var_samp?: Maybe<UserIgnoresVarSampOrderBy>,
  variance?: Maybe<UserIgnoresVarianceOrderBy>
};

/** input type for inserting array relation for remote table "user_ignores" */
export type UserIgnoresArrRelInsertInput = {
  data: Array<UserIgnoresInsertInput>,
  on_conflict?: Maybe<UserIgnoresOnConflict>
};

/** aggregate avg on columns */
export type UserIgnoresAvgFields = {
  __typename?: 'user_ignores_avg_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by avg() on columns of table "user_ignores" */
export type UserIgnoresAvgOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** Boolean expression to filter rows from the table "user_ignores". All fields are combined with a logical 'AND'. */
export type UserIgnoresBoolExp = {
  _and?: Maybe<Array<Maybe<UserIgnoresBoolExp>>>,
  _not?: Maybe<UserIgnoresBoolExp>,
  _or?: Maybe<Array<Maybe<UserIgnoresBoolExp>>>,
  company?: Maybe<CompaniesBoolExp>,
  company_id?: Maybe<IntComparisonExp>,
  created_at?: Maybe<TimestamptzComparisonExp>,
  deleted_at?: Maybe<TimestamptzComparisonExp>,
  id?: Maybe<IntComparisonExp>,
  updated_at?: Maybe<TimestamptzComparisonExp>,
  user?: Maybe<UsersBoolExp>,
  user_id?: Maybe<IntComparisonExp>
};

/** unique or primary key constraints on table "user_ignores" */
export enum UserIgnoresConstraint {
  /** unique or primary key constraint */
  UserIgnoresPkey = 'user_ignores_pkey',
}

/** input type for incrementing integer column in table "user_ignores" */
export type UserIgnoresIncInput = {
  company_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  user_id?: Maybe<Scalars['Int']>
};

/** input type for inserting data into table "user_ignores" */
export type UserIgnoresInsertInput = {
  company?: Maybe<CompaniesObjRelInsertInput>,
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  user?: Maybe<UsersObjRelInsertInput>,
  user_id?: Maybe<Scalars['Int']>
};

/** aggregate max on columns */
export type UserIgnoresMaxFields = {
  __typename?: 'user_ignores_max_fields',
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  user_id?: Maybe<Scalars['Int']>
};

/** order by max() on columns of table "user_ignores" */
export type UserIgnoresMaxOrderBy = {
  company_id?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** aggregate min on columns */
export type UserIgnoresMinFields = {
  __typename?: 'user_ignores_min_fields',
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  user_id?: Maybe<Scalars['Int']>
};

/** order by min() on columns of table "user_ignores" */
export type UserIgnoresMinOrderBy = {
  company_id?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** response of any mutation on the table "user_ignores" */
export type UserIgnoresMutationResponse = {
  __typename?: 'user_ignores_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<UserIgnores>
};

/** input type for inserting object relation for remote table "user_ignores" */
export type UserIgnoresObjRelInsertInput = {
  data: UserIgnoresInsertInput,
  on_conflict?: Maybe<UserIgnoresOnConflict>
};

/** on conflict condition type for table "user_ignores" */
export type UserIgnoresOnConflict = {
  constraint: UserIgnoresConstraint,
  update_columns: Array<UserIgnoresUpdateColumn>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** ordering options when selecting data from "user_ignores" */
export type UserIgnoresOrderBy = {
  company?: Maybe<CompaniesOrderBy>,
  company_id?: Maybe<OrderBy>,
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  user?: Maybe<UsersOrderBy>,
  user_id?: Maybe<OrderBy>
};

/** primary key columns input for table: "user_ignores" */
export type UserIgnoresPkColumnsInput = {
  id: Scalars['Int']
};

/** select columns of table "user_ignores" */
export enum UserIgnoresSelectColumn {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "user_ignores" */
export type UserIgnoresSetInput = {
  company_id?: Maybe<Scalars['Int']>,
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  user_id?: Maybe<Scalars['Int']>
};

/** aggregate stddev on columns */
export type UserIgnoresStddevFields = {
  __typename?: 'user_ignores_stddev_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by stddev() on columns of table "user_ignores" */
export type UserIgnoresStddevOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** aggregate stddev_pop on columns */
export type UserIgnoresStddevPopFields = {
  __typename?: 'user_ignores_stddev_pop_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by stddev_pop() on columns of table "user_ignores" */
export type UserIgnoresStddevPopOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** aggregate stddev_samp on columns */
export type UserIgnoresStddevSampFields = {
  __typename?: 'user_ignores_stddev_samp_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by stddev_samp() on columns of table "user_ignores" */
export type UserIgnoresStddevSampOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** aggregate sum on columns */
export type UserIgnoresSumFields = {
  __typename?: 'user_ignores_sum_fields',
  company_id?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  user_id?: Maybe<Scalars['Int']>
};

/** order by sum() on columns of table "user_ignores" */
export type UserIgnoresSumOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** update columns of table "user_ignores" */
export enum UserIgnoresUpdateColumn {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type UserIgnoresVarPopFields = {
  __typename?: 'user_ignores_var_pop_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by var_pop() on columns of table "user_ignores" */
export type UserIgnoresVarPopOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** aggregate var_samp on columns */
export type UserIgnoresVarSampFields = {
  __typename?: 'user_ignores_var_samp_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by var_samp() on columns of table "user_ignores" */
export type UserIgnoresVarSampOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** aggregate variance on columns */
export type UserIgnoresVarianceFields = {
  __typename?: 'user_ignores_variance_fields',
  company_id?: Maybe<Scalars['Float']>,
  id?: Maybe<Scalars['Float']>,
  user_id?: Maybe<Scalars['Float']>
};

/** order by variance() on columns of table "user_ignores" */
export type UserIgnoresVarianceOrderBy = {
  company_id?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  user_id?: Maybe<OrderBy>
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users',
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  email?: Maybe<Scalars['String']>,
  id: Scalars['Int'],
  updated_at?: Maybe<Scalars['timestamptz']>,
  /** An array relationship */
  user_ignores: Array<UserIgnores>,
  /** An aggregated array relationship */
  user_ignores_aggregate: UserIgnoresAggregate
};

/** columns and relationships of "users" */
export type UsersUserIgnoresArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** columns and relationships of "users" */
export type UsersUserIgnoresAggregateArgs = {
  distinct_on?: Maybe<Array<UserIgnoresSelectColumn>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<UserIgnoresOrderBy>>,
  where?: Maybe<UserIgnoresBoolExp>
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'users_aggregate',
  aggregate?: Maybe<UsersAggregateFields>,
  nodes: Array<Users>
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'users_aggregate_fields',
  avg?: Maybe<UsersAvgFields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<UsersMaxFields>,
  min?: Maybe<UsersMinFields>,
  stddev?: Maybe<UsersStddevFields>,
  stddev_pop?: Maybe<UsersStddevPopFields>,
  stddev_samp?: Maybe<UsersStddevSampFields>,
  sum?: Maybe<UsersSumFields>,
  var_pop?: Maybe<UsersVarPopFields>,
  var_samp?: Maybe<UsersVarSampFields>,
  variance?: Maybe<UsersVarianceFields>
};

/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UsersSelectColumn>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "users" */
export type UsersAggregateOrderBy = {
  avg?: Maybe<UsersAvgOrderBy>,
  count?: Maybe<OrderBy>,
  max?: Maybe<UsersMaxOrderBy>,
  min?: Maybe<UsersMinOrderBy>,
  stddev?: Maybe<UsersStddevOrderBy>,
  stddev_pop?: Maybe<UsersStddevPopOrderBy>,
  stddev_samp?: Maybe<UsersStddevSampOrderBy>,
  sum?: Maybe<UsersSumOrderBy>,
  var_pop?: Maybe<UsersVarPopOrderBy>,
  var_samp?: Maybe<UsersVarSampOrderBy>,
  variance?: Maybe<UsersVarianceOrderBy>
};

/** input type for inserting array relation for remote table "users" */
export type UsersArrRelInsertInput = {
  data: Array<UsersInsertInput>,
  on_conflict?: Maybe<UsersOnConflict>
};

/** aggregate avg on columns */
export type UsersAvgFields = {
  __typename?: 'users_avg_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by avg() on columns of table "users" */
export type UsersAvgOrderBy = {
  id?: Maybe<OrderBy>
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: Maybe<Array<Maybe<UsersBoolExp>>>,
  _not?: Maybe<UsersBoolExp>,
  _or?: Maybe<Array<Maybe<UsersBoolExp>>>,
  created_at?: Maybe<TimestamptzComparisonExp>,
  deleted_at?: Maybe<TimestamptzComparisonExp>,
  email?: Maybe<StringComparisonExp>,
  id?: Maybe<IntComparisonExp>,
  updated_at?: Maybe<TimestamptzComparisonExp>,
  user_ignores?: Maybe<UserIgnoresBoolExp>
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for incrementing integer column in table "users" */
export type UsersIncInput = {
  id?: Maybe<Scalars['Int']>
};

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  user_ignores?: Maybe<UserIgnoresArrRelInsertInput>
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'users_max_fields',
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>
};

/** order by max() on columns of table "users" */
export type UsersMaxOrderBy = {
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  email?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'users_min_fields',
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>
};

/** order by min() on columns of table "users" */
export type UsersMinOrderBy = {
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  email?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'users_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<Users>
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput,
  on_conflict?: Maybe<UsersOnConflict>
};

/** on conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint,
  update_columns: Array<UsersUpdateColumn>,
  where?: Maybe<UsersBoolExp>
};

/** ordering options when selecting data from "users" */
export type UsersOrderBy = {
  created_at?: Maybe<OrderBy>,
  deleted_at?: Maybe<OrderBy>,
  email?: Maybe<OrderBy>,
  id?: Maybe<OrderBy>,
  updated_at?: Maybe<OrderBy>,
  user_ignores_aggregate?: Maybe<UserIgnoresAggregateOrderBy>
};

/** primary key columns input for table: "users" */
export type UsersPkColumnsInput = {
  id: Scalars['Int']
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>,
  deleted_at?: Maybe<Scalars['timestamptz']>,
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  updated_at?: Maybe<Scalars['timestamptz']>
};

/** aggregate stddev on columns */
export type UsersStddevFields = {
  __typename?: 'users_stddev_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by stddev() on columns of table "users" */
export type UsersStddevOrderBy = {
  id?: Maybe<OrderBy>
};

/** aggregate stddev_pop on columns */
export type UsersStddevPopFields = {
  __typename?: 'users_stddev_pop_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by stddev_pop() on columns of table "users" */
export type UsersStddevPopOrderBy = {
  id?: Maybe<OrderBy>
};

/** aggregate stddev_samp on columns */
export type UsersStddevSampFields = {
  __typename?: 'users_stddev_samp_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by stddev_samp() on columns of table "users" */
export type UsersStddevSampOrderBy = {
  id?: Maybe<OrderBy>
};

/** aggregate sum on columns */
export type UsersSumFields = {
  __typename?: 'users_sum_fields',
  id?: Maybe<Scalars['Int']>
};

/** order by sum() on columns of table "users" */
export type UsersSumOrderBy = {
  id?: Maybe<OrderBy>
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type UsersVarPopFields = {
  __typename?: 'users_var_pop_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by var_pop() on columns of table "users" */
export type UsersVarPopOrderBy = {
  id?: Maybe<OrderBy>
};

/** aggregate var_samp on columns */
export type UsersVarSampFields = {
  __typename?: 'users_var_samp_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by var_samp() on columns of table "users" */
export type UsersVarSampOrderBy = {
  id?: Maybe<OrderBy>
};

/** aggregate variance on columns */
export type UsersVarianceFields = {
  __typename?: 'users_variance_fields',
  id?: Maybe<Scalars['Float']>
};

/** order by variance() on columns of table "users" */
export type UsersVarianceOrderBy = {
  id?: Maybe<OrderBy>
};
