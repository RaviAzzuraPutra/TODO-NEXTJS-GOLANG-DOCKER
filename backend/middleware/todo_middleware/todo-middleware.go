package todo_middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func GetJWT() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie("access_token")
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"Message": "Token tidak ditemukan",
			})
			ctx.Abort()
			return
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"Message": "Token tidak valid",
			})
			ctx.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"Message": "Token tidak valid (claims tidak ditemukan)",
			})
			ctx.Abort()
			return
		}

		userId, ok := claims["user_id"].(string)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"Message": "User ID tidak ditemukan di token",
			})
			ctx.Abort()
			return
		}

		slug := ""
		if val, exists := claims["slug"]; exists {
			slug, _ = val.(string)
		}

		ctx.Set("user_id", userId)
		ctx.Set("slug", slug)
		ctx.Next()
	}
}
