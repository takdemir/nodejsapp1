const http = require("http")

const server = http.createServer((req, res) => {

  if (req.method === "GET") {
    if (req.url === "/") {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      return res.end(JSON.stringify({message: "Success"}))
    }

    if (/.*\/api\/?.*/.test(req.url)) {
      if (req.url === '/api/users') {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify({message: "Success for all user list"}))
      }
    }

  }

  if (req.method === "POST") {

  }

  if (req.method === "PUT") {

  }

  res.statusCode = 404
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({message: `Not found ${req.url}`}))

})

server.listen(8000, "localhost", () => {
  console.log("Listening http://localhost:8000")
})
