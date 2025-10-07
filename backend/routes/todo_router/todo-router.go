package todo_router

import (
	"backend/controller/todo_controller"
	"backend/middleware/todo_middleware"

	"github.com/gin-gonic/gin"
)

func TodoRouter(app *gin.Engine) {
	route := app

	todo := route.Group("/todo")

	todo.Use(todo_middleware.GetJWT())

	todo.POST("/create-todo", todo_controller.CreateTodo)
	todo.GET("/", todo_controller.GetTodo)
	todo.GET("/:id", todo_controller.GetTodoByID)
	todo.DELETE("/:id", todo_controller.DeleteTodoByID)
	todo.PATCH("/update-todo/:id", todo_controller.UpdateTodo)
	todo.PUT("/update-status/:id", todo_controller.UpdateIsCompleted)
}
