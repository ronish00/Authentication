import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"



const userRegister = asyncHandler(async(req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body;
    
        if(!(firstname && lastname && email && password)){
            throw new ApiError(400, "All fields are required");
        }
    
        const userExist = await User.findOne({email});
        if(userExist){
            throw new ApiError(400, "User already exists")
        }
    
        const user = await User.create({
            firstname,
            lastname,
            email,
            password
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
        if(!createdUser){
            throw new ApiError(400, "User registration failed")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "User registration successful")
        )
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "User registration failed")
    }
})

export { userRegister }