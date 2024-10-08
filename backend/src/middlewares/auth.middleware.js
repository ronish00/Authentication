import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const incomingToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if(!incomingToken){
            throw new ApiError(400, "Unauthorized access");
        }
        const decodedData = jwt.verify(incomingToken, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedData){
            throw new ApiError(401, "Invalid Token");
        }
    
        const user = await User.findById(decodedData._id).select("-password -refreshToken");
    
        req.user = user;
    
        next();
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong verifying the token")
    }
})

export {verifyJWT}