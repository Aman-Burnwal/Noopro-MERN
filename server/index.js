const express = require("express");

const app = express();

// const courseRoute  = require("./routers/Course");
// const paymentRoute  = require("./routers/Payment");
// const profileRoute  = require("./routers/Profile");
const userRoute  = require("./routers/User");

const database = require("./config/database");

const cookieParser = require("cookie-parser");
const cros = require("cors");

const {cloudinaryConnect} = require("./config/cloudinaryConnect");

const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;


database();
app.use(express.json());
app.use(cookieParser());
app.use(
    cros({
        origin : "http://localhost:3000",
        credentials: true
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)


cloudinaryConnect();

app.use("/api/v1/auth", userRoute);
// app.use("/api/v1/profile", profileRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/payment", paymentRoute);


// defalut route

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server connection is successful"
    })
})

console.clear();
app.listen(PORT, ()=> console.log("App is runnit at port ", PORT));

