//The user model defines the schema of the user while
// hashing the passwords and checking validity of the user entered pass
//


const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
//PostSchema
// id="post-summary"
const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

function validate(next) {
    var password =
    $("#password").val();
    var confirmPassword =
    $("#confirm_password").val()
    if (password != confirm_password) {
        console.log("passwords do not match");
        $('validate-status').text("Passwords do not match")
    } else {
        console.log("passwords do match");
        $('#validate-status').text("Passwords Match")
    }
    next();
}

// if (password != confirm_password) {
//     console.log("passwords do not match");
// } else {
//
// }

// UserSchema.pre('save', function(next) {
//     // SET createdAt AND updatedAt
//     if (password != confirm_password) {
//         console.log("passwords do not match");
//     } else {
//         next();
//     }
// });

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
