package model

import (
	"github.com/dskline/jobsearch/features/db/enum"
	"github.com/jinzhu/gorm"
)

type Job struct {
	gorm.Model
	Title           string `gorm:"not null"`
	CompanyId       uint
	Company         Company `gorm:"foreignkey:CompanyId"`
	Description     string  `gorm:"not null"`
	DescriptionHTML string  `gorm:"not null"`
	Url             string  `gorm:"not null;unique"`
	MatchPercentage float64
	Scraper         enum.ScraperName
}
