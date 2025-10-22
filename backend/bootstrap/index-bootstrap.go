package bootstrap

import (
	"backend/config"
	"backend/database"
	"backend/routes/auth_router"
	"backend/routes/todo_router"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func InitialApp() {

	errENV := godotenv.Load()
	if os.Getenv("DEVELOPMENT") == "true" {
		if errENV != nil {
			log.Println("Terjadi Kesalahan Saat Load .env")
		}

		log.Println("⚙️  Mode Development Aktif")
	} else if os.Getenv("DEVELOPMENT") != "true" {
		log.Println("⚙️  Mode Production Aktif")
	}

	FrontendURL := os.Getenv("FRONTEND_URL")

	config.IndexConfig()

	database.ConnectDB()

	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{FrontendURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"content-length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60,
	}))

	app.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"Message": "Berjalan dengan baik 🚀",
		})
	})

	auth_router.AuthRouter(app)
	todo_router.TodoRouter(app)

	app.Run("0.0.0.0:" + os.Getenv("PORT"))

}
