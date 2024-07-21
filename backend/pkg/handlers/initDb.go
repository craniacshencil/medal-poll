package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/craniacshencil/medal-poll/backend/internal/database"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

type ApiHandler struct {
	DB *database.Queries
}

func SetupDb() (*ApiHandler, error) {
	err := godotenv.Load()
	if err != nil {
		log.Println("Couldn't open .env")
		return nil, fmt.Errorf("couldn't open .env")
	}

	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Println("Couldn't find database URL")
		return nil, fmt.Errorf("couldn't find database URL")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Println("Couldn't open database")
		return nil, fmt.Errorf("couldn't open database")
	}

	apiHandler := &ApiHandler{
		DB: database.New(db),
	}

	return apiHandler, nil
}
