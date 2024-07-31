package handlers

import (
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/utils"
)

func (apiHandler *ApiHandler) SubmissionHandler(w http.ResponseWriter, r *http.Request) {
	// Validate user in the backend using the cookies
	username, err := apiHandler.ValidateUser(r)
	// Return error(401 unauthorized if fails)
	if err != nil {
		log.Println("ERR:", err)
		utils.WriteJSON(w, http.StatusUnauthorized, err.Error())
		return
	}

	// Write query to find user's medals
	medals, err := apiHandler.DB.GetMedals(r.Context(), *username)
	// Return 404, if not present
	if err != nil {
		log.Println("ERR:", err)
		utils.WriteJSON(w, http.StatusNotFound, "you have not made a submission")
		return
	}

	// Else return medals with response
	// Return 200 Found, if present
	utils.WriteJSON(w, http.StatusOK, medals)
}
