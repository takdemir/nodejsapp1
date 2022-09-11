const express = require("express")
const app = express.Router()
const apiAuth = require("../middleware/apiAuth")

app.get('/', (req, res) => {
  console.log("id siz olan")
  console.log(req.query)
  console.log(req.body)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  return res.json({message: "Success users list"})
})

app.get('/:userId(\\d+)', apiAuth, (req, res) => {
  //console.log("id li olan")
  //console.log(req.params)
  //console.log(req.query)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  //console.log(module)
  return res.json({message: "Success user detail"})
})

app.post('/', apiAuth, (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  return res.json({message: "Success user post"})
})

module.exports = app
