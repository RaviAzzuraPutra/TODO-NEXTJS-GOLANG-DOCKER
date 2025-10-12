package todo_middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func GetJWT() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if ctx.Request.Method == http.MethodOptions {
			ctx.Status(http.StatusOK)
			return
		}

		tokenString, err := ctx.Cookie("access_token")

		// If cookie not found, try Authorization header Bearer <token>
		if err != nil || tokenString == "" {
			authHeader := ctx.GetHeader("Authorization")
			if authHeader == "" {
				ctx.JSON(http.StatusUnauthorized, gin.H{
					"Message": "Token tidak ditemukan",
				})
				ctx.Abort()
				return
			}

			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
				ctx.JSON(http.StatusUnauthorized, gin.H{
					"Message": "Format Authorization header tidak valid",
				})
				ctx.Abort()
				return
			}

			tokenString = parts[1]
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"Message": "Token tidak valid",
				"Error":   err.Error(),
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
			// try if stored as interface that can be converted
			if v, exists := claims["user_id"]; exists {
				switch vv := v.(type) {
				case string:
					userId = vv
					ok = true
				}
			}
		}

		if !ok || userId == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"Message": "User ID tidak ditemukan di token",
			})
			ctx.Abort()
			return
		}

		slug := ""
		if val, exists := claims["slug"]; exists {
			if s, ok := val.(string); ok {
				slug = s
			}
		}

		ctx.Set("user_id", userId)
		ctx.Set("slug", slug)
		ctx.Next()
	}
}
