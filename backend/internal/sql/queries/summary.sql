-- name: GetUser :one
SELECT username, password, responded
FROM summary 
WHERE username=$1;

-- name: UpdateMedals :one
UPDATE summary 
SET responded=$1, gold=$2, silver=$3, bronze=$4 
WHERE username=$5
RETURNING *;

-- name: GetMedals :one
SELECT gold, silver, bronze 
FROM summary 
WHERE username=$1;
