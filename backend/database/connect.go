package database

import (
	"backend/config/db_config"
	"backend/model"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {

	var errorConnect error

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		db_config.DBConfig().DB_HOST, db_config.DBConfig().DB_USER, db_config.DBConfig().DB_PASSWORD, db_config.DBConfig().DB_NAME, db_config.DBConfig().DB_PORT, db_config.DBConfig().DB_SSLMODE, db_config.DBConfig().DB_TIMEZONE)

	DB, errorConnect = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	errMigrate := DB.AutoMigrate(&model.User{}, &model.Todo{}, &model.Session{})

	if errMigrate != nil {
		log.Printf("GAGAL MIGRASI DATABASE ❌ " + errMigrate.Error())
	}

	if errorConnect != nil {
		panic("GAGAL TERHUBUNG KE DATABASE" + errorConnect.Error())
	}

	if DB == nil {
		panic("DATABASE TIDAK TERHUBUNG")
	}

	log.Printf("BERHASIL TERHUBUNG KE DATABASE ✅ Development Mode")

}
