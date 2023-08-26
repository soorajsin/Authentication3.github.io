const express = require("express");
const router = express();
const userdb = require("../Model/userSchema");



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
                              throw new Error("Plz All filled...")
                    } else {
                              const findUser = await userdb.findOne({
                                        email: email
                              });

                              if (findUser) {
                                        throw new Error("Email Already Exist")
                              } else {
                                        if (password !== cpassword) {
                                                  throw new Error("Password Not Matched..")
                                        } else {
                                                  const data = new userdb({
                                                            name,
                                                            email,
                                                            password,
                                                            cpassword
                                                  });
                                                  const storedata = await data.save();


                                                  res.status(201).json({
                                                            status: 201,
                                                            message: "Register Successfully....",
                                                            storedata: storedata
                                                  });
                                        }

                              }
                    }
          } catch (error) {

          }
});



module.exports = router;