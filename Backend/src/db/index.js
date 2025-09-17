// import mongoose from "mongoose"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { DB_NAME } from "../constants.js" 
// const dotenv=require('dotenv');
dotenv.config();
// dotenv.config({
//     path: './.env'
// })
const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MONGODB connected DB HOST : ${connectionInstance.connection.host}`)
    }
    catch(error){ 
        console.log("ERROR :",error);
        process.exit()
    }
}
export default connectDB;