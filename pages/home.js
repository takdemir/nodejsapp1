const express = require("express")
const app = express.Router()

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  return res.json({message: "Success home page"})
})

app.post('/abc', (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  return res.json({message: "Success home page"})
})

module.exports = app
