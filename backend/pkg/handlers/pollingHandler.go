package handlers

import (
	"log"
	"net/http"

	"github.com/craniacshencil/medal-poll/backend/internal/myTypes"
	"github.com/craniacshencil/medal-poll/backend/utils"
)

func (apiHandler *ApiHandler) PollingHandler(w http.ResponseWriter, r *http.Request) {
	err := apiHandler.ValidateUser(r)
	if err != nil {
		log.Println("ERR:", err)
		utils.WriteJSON(w, http.StatusUnauthorized, err.Error())
		return
	}
	var pollData myTypes.PollData
	utils.ParseJSON(r, &pollData)
	log.Println(pollData)
	utils.WriteJSON(w, http.StatusAccepted, "hey received message")
}