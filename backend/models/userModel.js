const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

userSchema.pre('save', function(next) {
    // hashing password
    var salt = bcrypt.genSaltSync();
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    console.log('hashed: ', this);

    next();
})



const User = mongoose.model('user', userSchema);

module.exports = User;
