const mongoose = require("mongoose");
require("dotenv").config;

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL  )
    .then(() => console.log("connected to database"))
    .catch(() =>{
         console.log("error in database connceted")
         process.exit(1);
        }
    )
}

 module.exports = dbConnect;