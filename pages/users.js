const express = require("express")
const app = express.Router()
const apiAuth = require("../middleware/apiAuth")
const query = require("../mysql");
const jwt = require("jsonwebtoken")

app.get('/', async (req, res) => {

  try {
    console.log(req.query)
    console.log(req.body)
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    const result = await query('select * from company')
    console.log(result)

    return res.json({message: "Success users list"})
  } catch (e) {
    return res.json({message: "Error:" + e.message})
  }

})

app.get('/:userId(\\d+)', apiAuth, (req, res) => {
  //console.log("id li olan")
  //console.log(req.params)
  //console.log(req.query)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  //console.log(module)
  return res.json({user: req.user, message: "Success user detail"})
})

/*app.post('/', apiAuth, (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  return res.json({message: "Success user post"})
})*/


app.post('/generate-token', async (req, res) => {

  try {
    res.setHeader("Content-Type", "application/json")
    console.log(req.body)
    const {email, password} = req.body
    if (!email) {
      return res.status(403).json({message: "Email is not valid"})
    }
    if (!password || password.length < 8) {
      return res.status(403).json({message: "Password is not valid"})
    }

    jwt.sign(password, process.env.JWT_SECRET_KEY, {}, async (error, encryptedPassword) => {
      if (error) {
        return res.json({message: "Error when creating your token"})
      } else {
        const result = await query(`select * from user where email='${email}' and password='${encryptedPassword}'`)

        if (result.length === 0) {
          return res.status(403).json({message: "No user found"})
        }

        jwt.sign({id: result[0].id, email}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'}, async (error, token) => {
          if (error) {
            return res.json({message: "Error when creating your token"})
          } else {
            return res.json({token, message: "Success"})
          }
        })
      }
    })
  } catch (e) {
    return res.json({message: "Error:" + e.message})
  }

})

app.post('', async (req, res) => {

  try {
    res.setHeader("Content-Type", "application/json")
    const {email, password, name} = req.body
    if (!email) {
      return res.status(400).json({message: "Email is not valid"})
    }
    if (!password || password.length < 8) {
      return res.status(400).json({message: "Password is not valid"})
    }
    if (!name || name.length < 2) {
      return res.status(400).json({message: "Name is not valid"})
    }

    let isEmailExist = await query(`select * from user where email='${email}'`);

    if (isEmailExist.length > 0) {
      return res.status(400).json({message: "Email is already exist!"})
    }

    jwt.sign(password, process.env.JWT_SECRET_KEY, {}, async (error, encryptedPassword) => {
      if (error) {
        return res.json({message: "Error when creating user"})
      } else {
        let insertQuery = `insert into user (email, password, name) values ('${email}','${encryptedPassword}','${name}')`
        let insertResult = await query(insertQuery)
        if (!insertResult.insertId) {
          return res.status(400).json({message: "Error when creating user"})
        }
        return res.json({message: "Success"})
      }
    })

  } catch (e) {
    return res.json({message: "Error:" + e.message})
  }
})


module.exports = app
