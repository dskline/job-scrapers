package model

import (
	"github.com/jinzhu/gorm"
)

type UserIgnores struct {
	gorm.Model
	CompanyId uint
	Company   Company `gorm:"foreignkey:CompanyId"`
	UserId    uint
	User      User `gorm:"foreignkey:UserId"`
}
