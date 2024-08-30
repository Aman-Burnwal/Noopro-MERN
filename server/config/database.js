const mongoose = require("mongoose");
require("dotenv").config;

exports.monogoDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("mongoDb connection successful"))
    .catch((error) =>{
        console.log(error)
         console.log("Error in mongoDb connection")
         process.exit(1)
        }
    )
}