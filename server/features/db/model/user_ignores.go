package model

import (
	"github.com/jinzhu/gorm"
)

type UserIgnores struct {
	gorm.Model
	CompanyId uint
	Company   Company
	UserId    uint
	User      User
}
