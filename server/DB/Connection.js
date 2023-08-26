const mongoose = require("mongoose");


const db = "mongodb+srv://soorajsingh7505:sooraj231@crud-app.4oebebt.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
}).then(() => console.log("Database Connected...")).catch((error) => {
          console.log(error, '  Error connecting to database');
})