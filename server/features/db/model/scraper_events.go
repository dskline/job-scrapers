package model

import (
	"github.com/jinzhu/gorm"
)

type ScraperEvent struct {
	gorm.Model
	Url          string `gorm:"not null"`
	JobsFound    int
	JobsFiltered int
}
