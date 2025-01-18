const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: [true, 'First name is required!'],
        maxlength: [40, 'Maximum length is 40'],
        minlength: [3, 'Minimum length is 3!']
    },
    lastname: {
        type: String,
        require: [true, 'Lirst name is required!'],
        maxlength: [40, 'Maximum length is 40!'],
        minlength: [3, 'Minimum length is 3!']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        require: [true, 'Email address is required!'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address!']
    },
    gender: {
        type: String,
        require: [true, 'Gender is required!'],
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported!'
        }
    },
    Password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [9, 'Minimum length is 9!'],
        maxlength: [25, 'Maximum length is 25!'],
      /*  match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,25}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
        ]*/
    },
    birthdate: {
        type: String,
        required: [true, 'Birthdate is required!'],
        match: [
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
            'Please provide a valid birthdate in DD/MM/YYYY format!'
        ]
    }

})

module.exports = mongoose.model('user', UserSchema);