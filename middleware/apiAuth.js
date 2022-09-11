module.exports = (req, res, next) => {
  try {
    const {authorization} = req.headers
    if (authorization !== "abde123*trgdf") {
      return res.status(403).json({success: false, message: "You are not authorised"})
    }
    next()
  } catch (e) {
    return res.status(500).json({success: false, message: "Oppps.. An error occurred. " + e.message})
  }
}
