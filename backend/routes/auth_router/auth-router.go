package auth_router

import (
	"backend/controller/auth_controller"
	"backend/middleware/auth_middleware"

	"github.com/gin-gonic/gin"
)

func AuthRouter(app *gin.Engine) {
	route := app

	route.POST("/login", auth_middleware.GuestMiddleware(), auth_controller.GoogleAuth)
	route.POST("/logout", auth_controller.Logout)
}
