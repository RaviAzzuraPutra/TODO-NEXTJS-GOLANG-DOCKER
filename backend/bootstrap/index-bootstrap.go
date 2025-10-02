package bootstrap

import (
	"backend/config"
	"backend/config/app_config"
	"backend/database"
	"backend/routes/auth_router"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func InitialApp() {
	errENV := godotenv.Load()

	if errENV != nil {
		log.Println("Terjadi Kesalahan Saat Load .env")
	}

	config.IndexConfig()

	database.ConnectDB()

	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"content-length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60,
	}))

	auth_router.AuthRouter(app)

	app.Run(app_config.PORT)
}
