const expect = require('chai').expect;
const request = require("request")

describe("user API test", () => {
  let backendUrl = "http://localhost:8000/api/user"

  it('generate-token must return token as json format', () => {
    let endPoint = `${backendUrl}/generate-token`
    request(endPoint, {
      method: 'POST',
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": "abc@def.com",
        "password": "Abcd123*"
      })
    }, (error, response, body) => {
      if (!error && body) {
        const {token, message} = JSON.parse(body)
        //console.log(response)
        expect(JSON.parse(body)).to.have.property("token")
        expect(token).not.equal("")
        expect(response.statusCode).to.equal(200)
        expect(token).to.be.a("string")
      }

    })
  })

  it('generate-token must return not found', () => {
    let endPoint = `${backendUrl}/generate-token`
    request(endPoint, {
      method: 'POST',
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": "abcd@def.com",
        "password": "Abcd123*"
      })
    }, (error, response, body) => {
      if (!error && body) {
        const {token, message} = JSON.parse(body)
        //console.log(response)
        expect(JSON.parse(body)).not.have.property("token")
        expect(response.statusCode).to.equal(403)
      }

    })
  })

})


/*
request('http://localhost:8080/about' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
 */
