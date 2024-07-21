package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/internal/myTypes"
	"github.com/craniacshencil/medal-poll/backend/utils"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user myTypes.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("While readin user-details")
		utils.WriteJSON(w, http.StatusBadRequest, err.Error())
		return
	}
	log.Println(user)
	utils.WriteJSON(w, http.StatusFound, "user found")
}
