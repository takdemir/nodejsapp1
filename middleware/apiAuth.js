const query = require("../mysql");
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const {authorization} = req.headers
    if (!authorization) {
      return res.status(403).json({success: false, message: "You are not authorised"})
    }

    jwt.verify(authorization, process.env.JWT_SECRET_KEY, {}, async (error, payload) => {
      if (error) {
        return res.status(403).json({success: false, message: "You are not authorised"})
      }

      const {id, email} = payload

      const selectQuery = `select id, email, name from user where email='${email}' and id=${id}`
      let isUserExist = await query(selectQuery)
      if (isUserExist.length === 0) {
        return res.status(403).json({success: false, message: "You are not authorised"})
      }
      req.user = isUserExist[0]
      next()
    })

  } catch (e) {
    return res.status(500).json({success: false, message: "Oppps.. An error occurred. " + e.message})
  }
}
