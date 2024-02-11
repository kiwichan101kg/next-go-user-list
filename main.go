package main

import (
	"fmt"
	"strconv"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	ID         uint   `gorm:"primaryKey"`
	Name       string `json:"name"`
	Department string `json:"department"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
}

func main() {
  db := sqlConnect()
	db.AutoMigrate(&User{})
  

  router := gin.Default()
	// CORS設定: localhost:3000からのリクエストを許容
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	router.Use(cors.New(config))

  router.GET("/user", func(ctx *gin.Context){
		db := sqlConnect()
		var users []User
		db.Order("created_at asc").Find(&users)
		

    // ユーザーデータをJSON形式で返す
		ctx.JSON(http.StatusOK, gin.H{
			"users": users,
		})
  })

	// 新しいユーザーを登録するエンドポイント
	router.POST("/user", func(ctx *gin.Context) {
		db := sqlConnect()
		

		var newUser User
		// JSON形式のリクエストボディを解析してnewUserに格納
		if err := ctx.ShouldBindJSON(&newUser); err != nil {
			// リクエストボディの解析に失敗した場合
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// データベースにユーザー情報を保存
		db.Create(&newUser)
		fmt.Printf("create user %s with email %s\n", newUser.Name, newUser.Email)

		// 成功レスポンスを返す
		ctx.JSON(http.StatusCreated, gin.H{
			"message": "User created successfully",
			"user":    newUser,
		})
	})


	// ユーザーを削除するエンドポイント
	router.DELETE("/user/:id", func(ctx *gin.Context) {
		db := sqlConnect()
		

		// URLパラメータからidを取得
		n := ctx.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			// idが数値でない場合はエラーレスポンスを返す
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID must be a number"})
			return
		}

		var user User
		// idに対応するユーザーを検索
		result := db.First(&user, id)
		if result.Error != nil {
			// ユーザーが見つからない場合はエラーレスポンスを返す
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		// ユーザーを削除
		db.Delete(&user)

		// 成功レスポンスを返す
		ctx.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
	})

  router.Run(":8080")
}

func sqlConnect() (database *gorm.DB) {
  // DBMS := "mysql"
  USER := "go_test"
  PASS := "password"
  PROTOCOL := "tcp(db:3306)"
  DBNAME := "go_database"

  CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=true&loc=Asia%2FTokyo"
	db, err := gorm.Open(mysql.Open(CONNECT), &gorm.Config{})
	if err != nil {
		panic("データベースへの接続に失敗しました: " + err.Error())
	}
	fmt.Println("DB接続成功")
	return db
}