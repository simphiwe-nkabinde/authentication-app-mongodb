
/**
 * Handles email & password registration errors.
 * @param {} err error object from mongoose.model.User
 * @returns {} { errors: {email: String, password: String} }
 */
module.exports.registration = (err) => {
    let errors  = { email: '', password: '' };

    // duplicate email - error    *issue: this 'if block' does not return before next 'if block'
    if(err.code === 11000) {
        console.log('code:', err.code);
        errors.email = 'this email is already registered';
        return {errors};
    }

    // registration validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        
    }

    return {errors};
}

/**
 * handles email & password login errors
 * @param {*} err custom errors thrown from authController.login
 * @returns {*} { errors: {email: String, password: String} }
 */
module.exports.login = (err) => {
    let errors = {email: '', password: ''};

    if (err.message.includes('email')) {
        errors.email = err.message
    }
    if (err.message.includes('password')) {
        errors.password = err.message
    }

    return {errors};
}