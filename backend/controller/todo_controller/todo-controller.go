package todo_controller

import (
	"backend/database"
	"backend/model"
	"backend/request/todo_request"
	"backend/utils"
	"errors"
	"fmt"
	"log"

	"github.com/abadojack/whatlanggo"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateTodo(ctx *gin.Context) {
	todoRequest := new(todo_request.TodoCreateRequest)
	userID := ctx.GetString("user_id")

	if errReq := ctx.ShouldBind(&todoRequest); errReq != nil {
		ctx.JSON(400, gin.H{
			"Message": "Bad Request",
			"Error":   "Terjadi Error pada Request" + errReq.Error(),
		})
		return
	}

	text := *todoRequest.Title + " " + *todoRequest.Description
	info := whatlanggo.Detect(text)
	lang := info.Lang.Iso6393()

	category, priority, insight, errGemini := utils.Gemini_Utils(*todoRequest.Title, *todoRequest.Description, *todoRequest.Deadline, lang)
	if errGemini != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Terjadi Error pada Gemini API" + errGemini.Error(),
		})
		log.Println("Error Gemini:", errGemini)
		return
	}

	todo := new(model.Todo)
	todo.User_id = &userID
	todo.Title = todoRequest.Title
	todo.Description = todoRequest.Description
	todo.Category = &category
	todo.Priority = &priority
	todo.Deadline = todoRequest.Deadline
	todo.Ai_Insight = &insight

	errDb := database.DB.Table("todo").Create(&todo).Error

	if errDb != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Terjadi Error pada Database" + errDb.Error(),
		})
		log.Println("Error DB:", errDb)
		return
	}

	ctx.JSON(201, gin.H{
		"Message": "Berhasil Membuat Todo",
		"Data":    todo,
	})
}

func GetTodo(ctx *gin.Context) {
	todo := new([]model.Todo)
	userSlug := ctx.GetString("slug")

	errDb := database.DB.Table("todo").Joins("JOIN users on users.id = todo.user_id").Where("users.slug = ?", userSlug).Order("is_completed asc").Order("deadline asc").Find(&todo).Error

	if errDb != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Terjadi Error pada Database" + errDb.Error(),
		})
		return
	}

	if len(*todo) == 0 {
		ctx.JSON(404, gin.H{
			"Message": "There is nothing to do at all!",
			"Data":    []model.Todo{},
		})
		return
	}

	ctx.JSON(200, gin.H{
		"Message": "Berhasil Mendapatkan Data Todo",
		"Data":    todo,
	})
}

func GetTodoByID(ctx *gin.Context) {
	ID := ctx.Param("id")
	userSlug := ctx.GetString("slug")

	todo := new(model.Todo)

	errDb := database.DB.Table("todo").Joins("JOIN users on users.id = todo.user_id").Where("todo.id = ? AND users.slug = ?", ID, userSlug).First(&todo).Error

	if errDb != nil {
		if todo.Id == nil {
			ctx.JSON(404, gin.H{
				"Message": "Data Tidak Ditemukan",
			})
			return
		} else {
			ctx.JSON(500, gin.H{
				"Message": "Internal Server Error",
				"Error":   "Terjadi Error pada Database" + errDb.Error(),
			})
			return
		}
	}

	ctx.JSON(200, gin.H{
		"Message": "Berhasil Mendapatkan Data Todo",
		"Data":    todo,
	})
}

func DeleteTodoByID(ctx *gin.Context) {
	id := ctx.Param("id")
	slug := ctx.GetString("slug")

	todo := new(model.Todo)

	errFind := database.DB.Table("todo").Joins("JOIN users on users.id = todo.user_id").Where("todo.id = ? AND users.slug = ?", id, slug).First(&todo).Error

	fmt.Println("ERR FIND:", errFind)

	if errFind != nil {
		if errors.Is(errFind, gorm.ErrRecordNotFound) {
			ctx.JSON(404, gin.H{
				"Message": "Data Tidak Ditemukan",
			})
			return
		} else {
			ctx.JSON(500, gin.H{
				"Message": "Internal Server Error",
				"Error":   "Terjadi Error pada Database: " + errFind.Error(),
			})
			return
		}
	}

	errDb := database.DB.Table("todo").Delete(&todo).Error

	if errDb != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Terjadi Kesalahan Saat Menghapus Data pada Database" + errDb.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"Message": "Berhasil Menghapus Data Todo",
	})
}

func UpdateTodo(ctx *gin.Context) {
	id := ctx.Param("id")
	userSlug := ctx.GetString("slug")
	todoRequest := new(todo_request.TodoUpdateRequest)

	if errRequestTodo := ctx.ShouldBind(&todoRequest); errRequestTodo != nil {
		ctx.JSON(400, gin.H{
			"Message": "Bad Request",
			"Error":   " Terjadi Error pada Request" + errRequestTodo.Error(),
		})
		return
	}

	todo := new(model.Todo)

	errFind := database.DB.Table("todo").Joins("JOIN users on users.id = todo.user_id").Where("todo.id = ? AND users.slug = ?", id, userSlug).First(&todo).Error

	if errFind != nil {
		if errors.Is(errFind, gorm.ErrRecordNotFound) {
			ctx.JSON(404, gin.H{"Message": "Data Tidak Ditemukan"})
			return
		} else {
			ctx.JSON(500, gin.H{
				"Message": "Internal Server Error",
				"Error":   "Terjadi Error pada Database" + errFind.Error(),
			})
			return
		}
	}

	updateData := map[string]interface{}{}

	// Track what fields are being updated
	titleChanged := false
	descChanged := false
	deadlineChanged := false

	if todoRequest.Title != nil && *todoRequest.Title != *todo.Title {
		updateData["title"] = todoRequest.Title
		titleChanged = true
	}
	if todoRequest.Description != nil && *todoRequest.Description != *todo.Description {
		updateData["description"] = todoRequest.Description
		descChanged = true
	}
	if todoRequest.Deadline != nil && *todoRequest.Deadline != *todo.Deadline {
		updateData["deadline"] = todoRequest.Deadline
		deadlineChanged = true
	}

	if len(updateData) == 0 {
		ctx.JSON(400, gin.H{
			"Message": "Bad Request",
			"Error":   " Tidak Ada Data yang Diupdate",
		})
		return
	}

	needsFullAIUpdate := titleChanged || descChanged
	needsPriorityUpdate := !needsFullAIUpdate && deadlineChanged

	if needsFullAIUpdate {
		title := *todo.Title
		desc := *todo.Description
		deadline := *todo.Deadline

		if todoRequest.Title != nil {
			title = *todoRequest.Title
		}
		if todoRequest.Description != nil {
			desc = *todoRequest.Description
		}
		if todoRequest.Deadline != nil {
			deadline = *todoRequest.Deadline
		}

		text := title + " " + desc
		info := whatlanggo.Detect(text)
		langCode := info.Lang.Iso6391()

		if langCode == "" {
			langCode = "id"
		}

		category, priority, insight, err := utils.Gemini_Utils(
			title,
			desc,
			deadline,
			langCode,
		)
		if err != nil {
			ctx.JSON(500, gin.H{"error": "Gagal menghasilkan AI insight", "details": err.Error()})
			return
		}

		updateData["category"] = category
		updateData["priority"] = priority
		updateData["ai_insight"] = insight
	} else if needsPriorityUpdate {
		deadline := *todo.Deadline
		if todoRequest.Deadline != nil {
			deadline = *todoRequest.Deadline
		}

		text := *todo.Title + " " + *todo.Description
		info := whatlanggo.Detect(text)
		langCode := info.Lang.Iso6391()
		if langCode == "" {
			langCode = "id"
		}

		_, priority, _, err := utils.Gemini_Utils(*todo.Title, *todo.Description, deadline, langCode)
		if err != nil {
			ctx.JSON(500, gin.H{"error": "Gagal menghasilkan priority", "details": err.Error()})
			return
		}
		updateData["priority"] = priority
	}

	fmt.Println("Updating todo with data:", updateData)

	errDb := database.DB.Table("todo").Where("id = ?", id).Updates(&updateData).Error

	if errDb != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Terjadi Kesalahan Saat Mengupdate Data pada Database" + errDb.Error(),
		})
		return
	}

	updatedTodo := new(model.Todo)
	errReload := database.DB.Table("todo").Where("id = ?", id).First(&updatedTodo).Error
	if errReload != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Gagal mengambil data terbaru: " + errReload.Error(),
		})
		return
	}

	ctx.JSON(201, gin.H{
		"Message": "Berhasil Merubah Data Todo",
		"Data":    updatedTodo,
	})

}

func UpdateIsCompleted(ctx *gin.Context) {
	id := ctx.Param("id")
	userSlug := ctx.GetString("slug")

	isCompletedRequest := new(todo_request.IsCompletedRequest)

	if errRequest := ctx.ShouldBind(&isCompletedRequest); errRequest != nil {
		ctx.JSON(400, gin.H{
			"Message": "Bad Request",
			"Error":   " Terjadi Error pada Request" + errRequest.Error(),
		})
		return
	}

	todo := new(model.Todo)

	errFind := database.DB.Table("todo").Joins("JOIN users on users.id = todo.user_id").Where("todo.id = ? AND users.slug = ?", id, userSlug).First(&todo).Error

	if errFind != nil {
		if todo.Id == nil {
			ctx.JSON(404, gin.H{
				"Message": "Data Tidak Ditemukan",
			})
			return
		} else {
			ctx.JSON(500, gin.H{
				"Message": "Internal Server Error",
				"Error":   "Terjadi Error pada Database" + errFind.Error(),
			})
			return
		}
	}

	todo.Is_Completed = *isCompletedRequest.Is_Completed

	errDb := database.DB.Table("todo").Where("todo.id = ?", id).Updates(&todo).Error

	if errDb != nil {
		ctx.JSON(500, gin.H{
			"Message": "Internal Server Error",
			"Error":   "Terjadi Kesalahan Saat Mengupdate Data pada Database" + errDb.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"Message": "Berhasil Merubah Status Todo",
		"Data":    todo,
	})
}
