import dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" //file system present in node js by default
dotenv.config();

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET ,
    });
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "missing"
});
 const uploadFile = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        const uploadResult = await cloudinary.uploader
       .upload(
           localFilePath, {
               resource_type : "auto"
           }
       )

        fs.unlinkSync(localFilePath)
       return uploadResult
    }catch(error){
        fs.unlinkSync(localFilePath) //removes locally saved file if method gets failed
    }

 }   
export {uploadFile}