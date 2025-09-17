import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
   fullname:{
    type:String,
    required:true,

   },
    avatar :{
        type : String,
        required : true
    },
    coverImage :{
        type : String,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password :{
        type : String,
        required : [true, 'Password is required']
    },
    refreshTokens : {
        type : String
    },

}, 
{
    timestamps : true
})

userSchema.pre("save",async function (next) { // for password encryption we use bcrypt
    // pre is a hook given by mongoDB to run any piece of code just before user saves data
    if(!this.isModified("password")){ // if any field other than password is modified retiurn 
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10) //if password is modified hash the password
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
      return  jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)

// JWT : json web token is a bearer token, anyone that has this token is authorised or owner