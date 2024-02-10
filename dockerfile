FROM golang:1.20-alpine as builder

WORKDIR /go/src

COPY go.mod .
COPY go.sum .

RUN go get github.com/gin-gonic/gin
