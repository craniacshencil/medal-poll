go:
	@cd backend && go run main.go

react:
	@cd frontend && pnpm dev 

build-react:
	@cd frontend && pnpm run build 

build-go:
	@cd backend && go build -o bin/medal-poll 

docker-go:
	@docker run -dp 127.0.0.1:8080:8080 medal_poll_backend:corrected_command 

docker-react:
	@docker run -dp 127.0.0.1:3000:3000 medal_poll_frontend:latest
