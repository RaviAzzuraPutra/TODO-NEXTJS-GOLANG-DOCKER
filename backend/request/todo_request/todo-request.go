package todo_request

type TodoCreateRequest struct {
	Title       *string `form:"title" binding:"required"`
	Description *string `form:"description" binding:"required"`
	Deadline    *string `form:"deadline" binding:"required"`
}

type TodoUpdateRequest struct {
	Title        *string `form:"title"`
	Description  *string `form:"description"`
	Deadline     *string `form:"deadline"`
	Is_Completed *bool   `form:"is_completed"`
}

type IsCompletedRequest struct {
	Is_Completed *bool `form:"is_completed"`
}
