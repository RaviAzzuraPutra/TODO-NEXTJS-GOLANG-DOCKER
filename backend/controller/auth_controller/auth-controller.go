package auth_controller

import (
	"backend/config/google_config"
	"backend/database"
	"backend/model"
	"backend/request/google_oauth_request"
	"context"
	"fmt"
	"math/rand"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/api/idtoken"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func GoogleAuth(ctx *gin.Context) {
	request := new(google_oauth_request.GoogleRequest)

	if errReq := ctx.ShouldBind(&request); errReq != nil {
		ctx.JSON(400, gin.H{
			"message": "Bad Request",
			"error":   "Terjadi Error Saat Memproses Request" + errReq.Error(),
		})
		return
	}

	payload, errPayload := idtoken.Validate(context.Background(), request.IdToken, google_config.GoogleConfig().CLIENT_ID)

	if errPayload != nil {
		ctx.JSON(401, gin.H{
			"Message": "Unauthorized",
			"Error":   "Terjadi Kesalahan Saat Validasi Id Token: " + errPayload.Error(),
		})
		return
	}

	email := payload.Claims["email"].(string)
	sub := payload.Claims["sub"].(string)
	name := payload.Claims["name"].(string)

	// make slug from name and generate random number number 6 digits
	generateSlug := func(name string) string {
		slug := strings.ToLower(name)
		reg := regexp.MustCompile(`[^a-z0-9\s-]+`)
		slug = reg.ReplaceAllString(slug, "")

		slug = strings.ReplaceAll(slug, " ", "-")
		reg = regexp.MustCompile(`-+`)
		slug = reg.ReplaceAllString(slug, "-")

		slug = strings.Trim(slug, "-")

		min := 100000
		max := 999999
		randomNumber := rand.Intn(max-min+1) + min

		return fmt.Sprintf("%s-%d", slug, randomNumber)
	}

	userSlug := generateSlug(name)

	user := new(model.User)

	tx := database.DB.Where("google_id = ?", sub).First(&user)

	if tx.RowsAffected == 0 {
		user = &model.User{
			Google_id:    &sub,
			Email:        &email,
			Display_name: &name,
			Slug:         &userSlug,
		}
		if errDB := database.DB.Create(&user).Error; errDB != nil {
			ctx.JSON(500, gin.H{
				"Message": "Terjadi Kesalahan Saat Menyimpan Data User",
				"Error":   errDB.Error(),
			})
			return
		}
	}

	claims := jwt.MapClaims{
		"user_id": sub,
		"email":   email,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), // expired 7 hari
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, errToken := token.SignedString(jwtSecret)

	if errToken != nil {
		ctx.JSON(500, gin.H{
			"Message": "Terjadi Kesalahan Saat Membuat Token",
			"Error":   errToken.Error(),
		})
		return
	}

	newSession := model.Session{
		User_id:       user.Id,
		Session_token: &tokenString,
	}

	if errDBSession := database.DB.Create(&newSession).Error; errDBSession != nil {
		ctx.JSON(500, gin.H{
			"Message": "Terjadi kesalahan saat menyimpan session",
			"Error":   errDBSession.Error(),
		})
		return
	}

	ctx.SetCookie("access_token", tokenString, 3600*24*7, "/", "localhost", false, true)

	ctx.JSON(200, gin.H{
		"Message": "Berhasil Login",
		"user":    user,
		"token":   tokenString,
	})

}

func Logout(ctx *gin.Context) {
	tokenString, errToken := ctx.Cookie("access_token")

	if errToken != nil {
		ctx.JSON(400, gin.H{
			"Message": "Bad Request",
			"Error":   "Tidak ada token yang ditemukan",
		})
		return
	}

	token, errParse := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("METODE INI TIDAK VALID!!!")
		}
		return jwtSecret, nil
	})

	if errParse != nil || !token.Valid {
		ctx.JSON(401, gin.H{
			"Message": "Unauthorized",
			"Error":   "Token tidak valid" + errParse.Error(),
		})
		return
	}

	errDB := database.DB.Unscoped().Where("session_token = ?", tokenString).Delete(&model.Session{}).Error

	if errDB != nil {
		ctx.JSON(500, gin.H{
			"Message": "Terjadi Kesalahan Saat Menghapus Session",
			"Error":   errDB.Error(),
		})
		return
	}

	ctx.SetCookie("access_token", "", -1, "/", "localhost", false, true)

	ctx.JSON(200, gin.H{
		"Message": "Berhasil Logout!!",
	})
}
