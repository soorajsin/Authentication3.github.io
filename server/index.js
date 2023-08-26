const express = require("express");
const app = express();
require("./DB/Connection");
const cors = require("cors");
const router = require("./Routes/route");
const cookieParser = require("cookie-parser");
const port = 4000;


app.get("/", (req, res) => {
          console.log("Server Created...");
})


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);



app.listen(port, () => {
          console.log(`Server is running on port no ${port}`);
});