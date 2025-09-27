package bootstrap

import (
	"backend/conifg"
	"backend/conifg/app_config"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func InitialApp() {
	errENV := godotenv.Load()

	if errENV != nil {
		log.Println("Terjadi Kesalahan Saat Load .env")
	}

	conifg.IndexConfig()

	app := gin.Default()

	app.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"Message": "Server Berjalan",
		})
	})

	app.Run(app_config.PORT)
}
