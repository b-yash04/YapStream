import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadFile } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

  
    if (!fullname?.trim()) throw new ApiError(400, "Full name is required");
    if (!email?.trim()) throw new ApiError(400, "Email is required");
    if (!username?.trim()) throw new ApiError(400, "Username is required");
    if (!password?.trim()) throw new ApiError(400, "Password is required");

    const existedUser = await User.findOne({ 
        $or: [{ email }, { username: username.toLowerCase() }] 
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists with this email/username");
    }
console.log("Files received:", req.files);
console.log("Avatar local path:", req.files?.avatar?.[0]?.path);

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    console.log(coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadFile(avatarLocalPath);
  
    const coverImage = coverImageLocalPath ? await uploadFile(coverImageLocalPath) : null;
  
    if (!avatar?.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

   
    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "Registration successful!")
    );
});

const loginUser = asyncHandler(async(req,res)=>{

})
export { registerUser , 
    loginUser
}
