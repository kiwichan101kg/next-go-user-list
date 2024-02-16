package model

type User struct {
	ID         uint   `gorm:"primaryKey"`
	Name       string `json:"name"`
	Department string `json:"department"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
}