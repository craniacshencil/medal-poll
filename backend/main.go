package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type User struct {
	Username string
	Password string
}

func main() {
	router := http.NewServeMux()
	router.HandleFunc("GET /", simplePing)
	router.HandleFunc("POST /login", loginHandler)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"localhost:3000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
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
	w.Header().Add("message", "success")
	w.WriteHeader(http.StatusOK)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("While readin user-details")
		w.Header().Add("error", err.Error())
		w.WriteHeader(http.StatusBadRequest)
	}
	log.Println(user)
	w.Header().Add("message", "success")
	w.WriteHeader(http.StatusOK)
}
