package db

import (
	"github.com/dskline/jobsearch/features/config"
	"github.com/dskline/jobsearch/features/db/model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB

func Connect() {
	var err error
	db, err = gorm.Open("postgres", config.Get("ORM_POSTGRESQL_OPTIONS", "host=localhost port=5432 user=postgres dbname=jobs password=docker sslmode=disable"))
	if err != nil {
		panic(err)
	}

	// Migrate the schema
	//db.DropTable(&model.Job{})
	//db.DropTable(&model.Company{})
	//db.DropTable(&model.User{})
	//db.DropTable(&model.UserIgnores{})
	db.AutoMigrate(&model.Company{})
	db.AutoMigrate(&model.Job{})
	db.Model(&model.Job{}).AddForeignKey("company_id", "companies(id)", "CASCADE", "CASCADE")
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.UserIgnores{})
	db.Model(&model.UserIgnores{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	db.Model(&model.UserIgnores{}).AddForeignKey("company_id", "companies(id)", "CASCADE", "CASCADE")
}

func Instance() *gorm.DB {
	return db
}
