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

	// Store login details in loginUser struct
	err := json.NewDecoder(r.Body).Decode(&loginUser)
	if err != nil {
		log.Println("While readin user-details")
		utils.WriteJSON(w, http.StatusBadRequest, err.Error())
		return
	}

	// Get the user's username, password and whether they have 'responded' or not to the poll
	DBUser, err := apiHandler.DB.GetUser(r.Context(), loginUser.Username)
	if err != nil {
		log.Println("user not found:", err)
		utils.WriteJSON(w, http.StatusNotFound, err.Error())
		return
	}

	// Check for password mismatch
	if loginUser.Password != DBUser.Password {
		log.Println("incorrect password")
		utils.WriteJSON(w, http.StatusUnauthorized, "incorrect password")
		return
	}

	// Check if user has already polled
	if DBUser.Responded {
		log.Println("already responded")
		utils.WriteJSON(
			w,
			http.StatusOK,
			createResponse(
				loginUser.Username,
				loginUser.Password,
				"already responded",
				"submission",
			),
		)
		return
	}

	utils.WriteJSON(
		w,
		http.StatusOK,
		createResponse(loginUser.Username, loginUser.Password, "continue to polling", "polling"),
	)
}

func createResponse(username, password, message, redirect string) map[string]string {
	return (map[string]string{
		"username": username,
		"password": password,
		"message":  message,
		"redirect": redirect,
	})
}
