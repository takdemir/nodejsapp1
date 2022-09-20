const express = require("express")
const app = express()
require("dotenv").config({path: '.env.local'})
const helmet = require("helmet")
const apiAuth = require("./middleware/apiAuth")


app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-auth-token, content-type, authorization, Authorization");
    return res.status(200).send();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Expose-Headers", "authorization");
  res.header("Access-Control-Expose-Headers", "Authorization");
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, x-auth-token, authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});

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
