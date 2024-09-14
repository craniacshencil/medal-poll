FROM golang:1.22-alpine as builder
WORKDIR /app
# I have a vendor directory so I don't need to download
# using go.mod and go.sum
COPY . .
RUN CGO_ENABLED=0 go build -o bin/medal-poll

# Separate production server for running binary
FROM alpine as production
WORKDIR /build
COPY --from=builder /app/bin/medal-poll .
COPY --from=builder /app/.env .
EXPOSE 8080
CMD ["./medal-poll"]
