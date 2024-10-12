const bcryptjs = require('bcryptjs')
// models
// user model
const User = require("../models/usersModel")
// utils
// users utils
const {
    MAX_AGE,
    errorHandler,
    generateToken,
} = require('../utils/usersUtils')

// get all users
const getAllUsers = async (req,res) => {
    try {
        const users = await User.find().select({username: 1, _id: 1, email: 1})
        return res.status(200).json({users})
    } catch (err) {
        return res.status(400).json({error: 'get all users error'})
    }
}

// user registration
const userRegistration = async (req,res) => {
    const {username,email,password} = req.body 
    try{
        const user = await User.create({username,email,password})
        const token = generateToken(user._id)
        res.cookie("token",token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        })
        return res.status(200).json({message: 'authenticated'})
    }catch(err){
        const errors = errorHandler(err)
        return res.status(400).json({errors})
    }
}             

// user login
const userLogin = async (req,res) => {
    const {username,password} = req.body 
    try{
        if(!username?.trim()){
            throw new Error("username required")
        }
        if(!password){
            throw new Error("password required")
        }
        const user = await User.findOne({username})
        if(!user){
            throw new Error("user not exist")
        }
        // password match
        const isPasswordMatch = bcryptjs.compareSync(password,user.password)

        if(!isPasswordMatch){
            throw new Error("incorrect password")
        }

        const token = generateToken(user._id)

        res.cookie('token',token, {
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        })

        return res.status(200).json({message: 'authenticated'})

    }catch(err){
        const errors = errorHandler(err)
        return res.status(400).json({errors})
    }
}

// user logout
const userLogout = (req,res) => {
    res.cookie('token','',{maxAge: 1})
    return res.status(200).json({message: 'user logout'})
}


// is user authenticated
const isUserAuthenticated = (req,res) => {
    return res.status(200).json({user: req.user})
}

// exports
module.exports = {
    getAllUsers,
    userRegistration,
    userLogin,
    userLogout,
    isUserAuthenticated,
}