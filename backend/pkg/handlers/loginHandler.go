package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/pkg/myTypes"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user myTypes.User
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
