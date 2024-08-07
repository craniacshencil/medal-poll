// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: summary.sql

package database

import (
	"context"
	"database/sql"
)

const getMedals = `-- name: GetMedals :one
SELECT gold, silver, bronze 
FROM summary 
WHERE username=$1
`

type GetMedalsRow struct {
	Gold   sql.NullString
	Silver sql.NullString
	Bronze sql.NullString
}

func (q *Queries) GetMedals(ctx context.Context, username string) (GetMedalsRow, error) {
	row := q.db.QueryRowContext(ctx, getMedals, username)
	var i GetMedalsRow
	err := row.Scan(&i.Gold, &i.Silver, &i.Bronze)
	return i, err
}

const getUser = `-- name: GetUser :one
SELECT username, password, responded
FROM summary 
WHERE username=$1
`

type GetUserRow struct {
	Username  string
	Password  string
	Responded bool
}

func (q *Queries) GetUser(ctx context.Context, username string) (GetUserRow, error) {
	row := q.db.QueryRowContext(ctx, getUser, username)
	var i GetUserRow
	err := row.Scan(&i.Username, &i.Password, &i.Responded)
	return i, err
}

const updateMedals = `-- name: UpdateMedals :one
UPDATE summary 
SET responded=$1, gold=$2, silver=$3, bronze=$4 
WHERE username=$5
RETURNING username, password, responded, gold, silver, bronze
`

type UpdateMedalsParams struct {
	Responded bool
	Gold      sql.NullString
	Silver    sql.NullString
	Bronze    sql.NullString
	Username  string
}

func (q *Queries) UpdateMedals(ctx context.Context, arg UpdateMedalsParams) (Summary, error) {
	row := q.db.QueryRowContext(ctx, updateMedals,
		arg.Responded,
		arg.Gold,
		arg.Silver,
		arg.Bronze,
		arg.Username,
	)
	var i Summary
	err := row.Scan(
		&i.Username,
		&i.Password,
		&i.Responded,
		&i.Gold,
		&i.Silver,
		&i.Bronze,
	)
	return i, err
}
