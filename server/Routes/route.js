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
                              }else{
                                        
                              }
                    }
          } catch (error) {

          }
});



module.exports = router;