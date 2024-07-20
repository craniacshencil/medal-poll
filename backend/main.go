package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	router := http.NewServeMux()
	router.HandleFunc("GET /", simplePing)
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", 8080),
		Handler: router,
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
