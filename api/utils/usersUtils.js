const jwt = require('jsonwebtoken')

// max age
const MAX_AGE = 60 * 60;

// error handler
const errorHandler = err => {
    const errors = {username: "", email: "",password: ""};
    // duplicate key
    if(err.code === 11000){
        if(err.message.includes('username')){
            errors.username = "username taken"
        }
        if(err.message.includes("email")){
            errors.email = "email address already exist"
        }
    }
    // credentials  required
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    // username required
    if(err.message === "username required"){
        errors.username = "username required"
    }
    // password required
    if(err.message === "password required"){
        errors.password = "password required"
    }
    // user not exist
    if(err.message === "user not exist"){
        errors.username = 'user not exist'
    }
    // incorrect password
    if(err.message === "incorrect password"){
        errors.password = "incorrect password"
    }

    return errors;
}

// generate token
const generateToken = _id => {
    return jwt.sign({_id}, process.env.JWT_SECRET,{expiresIn: MAX_AGE})
}

// exports
module.exports = {
    MAX_AGE,
    errorHandler,
    generateToken,
}