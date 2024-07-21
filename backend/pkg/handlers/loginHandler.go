package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/internal/myTypes"
	"github.com/craniacshencil/medal-poll/backend/utils"
)

func (apiHandler *ApiHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var loginUser myTypes.User
	err := json.NewDecoder(r.Body).Decode(&loginUser)
	if err != nil {
		log.Println("While readin user-details")
		utils.WriteJSON(w, http.StatusBadRequest, err.Error())
		return
	}
	DBUser, err := apiHandler.DB.GetUser(r.Context(), loginUser.Username)
	if err != nil {
		log.Println("user not found:", err)
		utils.WriteJSON(w, http.StatusNotFound, err.Error())
		return
	}

	log.Println(loginUser)
	log.Println(DBUser)
	utils.WriteJSON(w, http.StatusFound, "user found")
}
