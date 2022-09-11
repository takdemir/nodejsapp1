const express = require("express")
const app = express()
require("dotenv").config({path: '.env.local'})
const helmet = require("helmet")
const apiAuth = require("./middleware/apiAuth")


let users = [
  {
    id: 1,
    name: "Taner",
    lastName: "Akdemir"
  },
  {
    id: 2,
    name: "Salih Can",
    lastName: "Erşahin"
  }
]

let modifiedUsers = users.map((user, index, arr) => {
  console.log("arr",arr)
  return {...user, ...{gender: "male", index}}
})

console.log(modifiedUsers)




// middleware
app.use(helmet())
app.use(express.json())

app.use('/', require('./pages/home'))
app.use('/api/user', require('./pages/users'))
app.use('/api/admin', apiAuth, require('./pages/admin'))

let port = process.env.PORT
app.listen(port)

app.on("error", (error) => {
  switch (error.code) {
    case 'EACCES':
      console.log("Access required")
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.log(`port ${port} is already in use`)
      process.exit(1)
      break
    default:
      console.log("No matched error code" + error.code)
      throw error
  }
})
