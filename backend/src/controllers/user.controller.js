import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong generating tokens")
    }
}

const userRegister = asyncHandler(async(req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body;
        console.log(firstname, lastname, email, password)
    
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

const userLogin = asyncHandler(async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!(email && password)){
            throw new ApiError(400, "Email and Password must be provided");
        }
    
        const user = await User.findOne({email});
        if(!user) {
            throw new ApiError(400, "User not found");
        }
    
        const isPasswordValid = await user.isPasswordCorrect(password);
        if(!isPasswordValid){
            throw new ApiError(400, "Password is not correct");
        }
    
        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            }, "User logged in successfully")
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while logging in");
    }
})

const logout = asyncHandler(async(req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            }
        )
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "something went wrong logging out")
    }
})

export { userRegister, userLogin, logout }