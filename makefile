go:
	@cd backend && go run main.go

react:
	@cd frontend && pnpm dev 

build-react:
	@cd frontend && npm run build 

build-go:
	@cd backend && go build -o bin/medal-poll 
