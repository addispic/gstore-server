const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const {isEmail} = require('validator')

// users schema
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'email required'],
        validate: [isEmail, "invalid email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"password required"],
        minlength: [3, "too short password"],
    },
},{
    timestamps: true,
})

// hashing password
usersSchema.pre('save', function(next){
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
})

// export
module.exports = mongoose.models.User || mongoose.model("User",usersSchema)