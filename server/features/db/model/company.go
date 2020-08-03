package model

import "github.com/jinzhu/gorm"

type Company struct {
	gorm.Model
	CompanyName  string `gorm:"not null;unique"`
	Industry     string
	Rating       float64
	RatingHTML   string
	GlassdoorUrl string
}
