const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "jhuytredsgfvbhjklmjhyftrdxsedf";




const userSchema = mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    unique: true,
                    required: true,
                    validator(value) {
                              if (!validator.Email("@")) {
                                        throw new Error('Invalid Email');
                              }
                    }

          },
          password: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          cpassword: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});



//hash password
userSchema.pre('save', async function (next) {
          const user = this;

          if (user.isModified('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                    user.cpassword = await bcrypt.hash(user.cpassword, 10);
          }

          next();
});




//token generate
userSchema.methods.generateAuthToken = async function () {
          const user = this;

          const token = jwt.sign({
                    _id: user._id.toString()
          }, keysecret);

          user.tokens = user.tokens.concat({
                    token
          });

          await user.save();

          return token;
}






const userdb = mongoose.model("users", userSchema);
module.exports = userdb;