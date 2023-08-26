const express = require("express");
const router = express();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");



router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              res.status(422).json({
                                        error: "Plz fill all details..."
                              })
                    } else {
                              // console.log(findUser);
                              const findUser = await userdb.findOne({
                                        email: email
                              });

                              if (findUser) {
                                        res.status(422).json({
                                                  error: "Email Already Exist"
                                        })
                              } else {
                                        // console.log("done");
                                        // if (password !== cpassword) {
                                        //           res.status(422).json({
                                        //                     error: "Password and Confirm Password not match!"
                                        //           })
                                        // } 


                                        //hash password 
                                        const hashPassword = await bcrypt.hash(password, 10);


                                        const addData = new userdb({
                                                  name,
                                                  email,
                                                  password: hashPassword,
                                                  cpassword: hashPassword
                                        });
                                        const storeData = await addData.save();
                                        // console.log(storeData);

                                        res.status(201).json({
                                                  status: 201,
                                                  message: "Registration Successfully Done!",
                                                  storeData
                                        })



                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Not add data in database"
                    })
          }
});



//login user
router.post("/login", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              throw Error('Please enter all field');
                    }


                    //
                    const userValid = await userdb.findOne({
                              email: email
                    });

                    if (userValid) {
                              const validPass = await bcrypt.compare(password, userValid.password);

                              if (!validPass) {
                                        res.status(422).json({
                                                  error: "Invalid details"
                                        })
                              } else {
                                        //generate token
                                        const token = await userValid.generateAuthToken();
                                        console.log(token);
                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "user not login error"
                    })
          }
})



module.exports = router;