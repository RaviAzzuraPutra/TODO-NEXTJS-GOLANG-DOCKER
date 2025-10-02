package auth_middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func GuestMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie("access_token")

		if err == nil {
			token, _ := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
				return jwtSecret, nil
			})

			if token != nil && token.Valid {
				ctx.JSON(http.StatusForbidden, gin.H{
					"Message": "Sudah Login",
				})
				ctx.Abort()
				return
			}
		}
		ctx.Next()
	}
}
