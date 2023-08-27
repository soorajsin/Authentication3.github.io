const jwt = require("jsonwebtoken");
const userdb = require("../Model/userSchema");
const keysecret = "jhuytredsgfvbhjklmjhyftrdxsedf";


const authentication = async (req, res, next) => {
          try {
                    const token = req.headers.authorization;
                    // console.log("auth  " + token);

                    const verifytoken = jwt.verify(token, keysecret);
                    // console.log(verifytoken);

                    const rootUser = await userdb.findOne({
                              _id: verifytoken._id
                    });
                    // console.log(rootUser);

                    if (!rootUser) {
                              throw new Error("user not found")
                    }


                    req.token = token
                    req.rootUser = rootUser
                    req.userId = rootUser._id

                    next();


          } catch (error) {
                    res.status(422).json({
                              error: "Token not found"
                    })
          }
}


module.exports = authentication;