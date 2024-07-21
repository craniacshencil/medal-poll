-- name: GetUser :one
SELECT username, password, responded
FROM summary 
WHERE username=$1;

