const jwt = require('jsonwebtoken')

// models
// user model
const User = require('../models/usersModel')

// private route
const authMiddleware = async (req,res, next) => {
    try {
        const token = req.cookies.token 
        if(!token){
            return res.status(400).json({error: 'unauthorized'})
        }
        // decoded token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken._id).select({username: 1, _id: 1, email: 1})
        if(!user){
            return res.status(400).json({error: 'unauthorized'})
        }
        req.user = user
        next()
    } catch (err) {
        return res.status(400).json({error: 'unauthorized'})
    }
}

// exports
module.exports = authMiddleware