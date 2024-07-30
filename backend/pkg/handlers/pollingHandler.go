package handlers

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/internal/database"
	"github.com/craniacshencil/medal-poll/backend/internal/myTypes"
	"github.com/craniacshencil/medal-poll/backend/utils"
)

func (apiHandler *ApiHandler) PollingHandler(w http.ResponseWriter, r *http.Request) {
	// validating user
	username, err := apiHandler.ValidateUser(r)
	if err != nil {
		log.Println("ERR:", err)
		utils.WriteJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	// Storing request data
	var pollData myTypes.PollData
	utils.ParseJSON(r, &pollData)

	// Storing values in database
	_, err = apiHandler.DB.UpdateMedals(r.Context(), database.UpdateMedalsParams{
		Responded: true,
		Gold:      sql.NullString{String: pollData.Medals[0].Value, Valid: true},
		Silver:    sql.NullString{String: pollData.Medals[1].Value, Valid: true},
		Bronze:    sql.NullString{String: pollData.Medals[2].Value, Valid: true},
		Username:  *username,
	})
	if err != nil {
		log.Println("ERR:While updating medals:", err)
		utils.WriteJSON(w, http.StatusNotAcceptable, map[string]string{"error": err.Error()})
		return
	}

	// Successful scenario
	utils.WriteJSON(w, http.StatusAccepted, "hey received message")
}
