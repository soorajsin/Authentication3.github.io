const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");




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
})






const userdb = mongoose.model("users", userSchema);
module.exports = userdb;