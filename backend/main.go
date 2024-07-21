package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/pkg/handlers"
	"github.com/craniacshencil/medal-poll/backend/utils"
	"github.com/rs/cors"
)

func main() {
	router := http.NewServeMux()
	router.HandleFunc("GET /", simplePing)
	router.HandleFunc("POST /login", handlers.LoginHandler)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"Content-Length"},
	})

	corsEnabledRouter := c.Handler(router)
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", 8080),
		Handler: corsEnabledRouter,
	}

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal("There was an error starting the server")
	}
}

func simplePing(w http.ResponseWriter, r *http.Request) {
	log.Println("Hello from the server")
	utils.WriteJSON(w, http.StatusOK, "Hello from the server")
}
