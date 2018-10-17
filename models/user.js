const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
//PostSchema
// id="post-summary"
const UserSchema = new Schema({
    createdAt       : { type: Date },
    updatedAt       : { type: Date },
    password        : { type: String, select: false },
    username        : { type: String, required: true },
    // email           : { type: }
});

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = (password, done) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
