package handlers

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
)

// Takes username and password from cookies
// Matches it with the pair in database
func (apiHandler *ApiHandler) ValidateUser(r *http.Request) error {
	// Reading password from cookies
	password, err := r.Cookie("password")
	if err != nil {
		log.Println("ERR: While reading password from cookie:", err)
		return fmt.Errorf("couldn't read password, you are not logged in")
	}

	// Reading username from cookies
	username, err := r.Cookie("username")
	if err != nil {
		log.Println("ERR: While reading username from cookie:", err)
		return fmt.Errorf("couldn't read username, you are not logged in")
	}
	usernameString := username.Value

	// Retrieving password and username for crosscheck
	user, err := apiHandler.DB.GetUser(r.Context(), usernameString)
	// username not found in db
	if err != nil {
		log.Println("ERR: Didn't find username in database")
		return fmt.Errorf("couldn't find username in database, you are not logged in")
	}

	// decoding password to the right format
	// eg: '{' in password gets encoded to '7%B' because '{' has special meaning and gets automatically encoded
	passwordDecoded, err := url.QueryUnescape(password.Value)
	if err != nil {
		log.Println("ERR: Couldn't decode password'")
		return fmt.Errorf("couldn't decode password")
	}

	// Password mismatch b/w cookies and db
	if user.Password != passwordDecoded {
		log.Println("ERR: password in cookies is incorrect")
		return fmt.Errorf("passwords didn't match, you are not logged in")
	}

	return nil
}
