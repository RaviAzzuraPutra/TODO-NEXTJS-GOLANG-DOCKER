FROM golang:1.22

WORKDIR /app

RUN go mod tidy

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 7001

CMD ["./main"]