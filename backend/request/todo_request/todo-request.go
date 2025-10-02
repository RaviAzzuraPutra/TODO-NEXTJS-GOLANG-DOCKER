package todo_request

type TodoRequest struct {
	Title        *string `form:"title" binding:"required"`
	Description  *string `form:"description" binding:"required"`
	Category     *string `form:"category" binding:"required"`
	Priority     *string `form:"priority" binding:"required"`
	Deadline     *string `form:"deadline" binding:"required"`
	Is_Completed bool    `form:"is_completed" gorm:"default:false" binding:"required"`
	Ai_Insight   *string `form:"ai_insight" binding:"required"`
}
