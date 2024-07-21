include .env
run:
	@go run main.go

up:
	@cd internal/sql/schema && \
	goose postgres ${GOOSE_URL} up

down:
	@cd internal/sql/schema && \
	goose postgres ${GOOSE_URL} down

seed-db:
	@psql -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -p ${DB_PORT} -f seedDB.sql
