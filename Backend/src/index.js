import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import express from "express"
import {app} from "./app.js";
import connectDB from "./db/index.js";




// app.listen(process.env.PORT,()=>{
//     console.log(`Server is running ${process.env.PORT}`)
// })
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

