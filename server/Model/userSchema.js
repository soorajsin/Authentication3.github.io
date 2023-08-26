const mongoose = require("mongoose");
const validate = require("validatorjs");




const userSchema = mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    unique: true,
                    required: true,
                    validate(value) {
                              if (!validate.email("@")) {
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




const userdb = mongoose.model("users", userSchema);
module.exports = userdb;