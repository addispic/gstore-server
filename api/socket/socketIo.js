const express = require('express')
const http = require("http")

// app
const app = express()

// server
const server = http.createServer(app)

// exports
module.exports = {
    app,
    server,
}