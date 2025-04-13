import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        // Check if token exists
        if (!token) {
            return next(new AppError("Unauthenticated, please login again", 401));
        }

        // Verify token
        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

        // Attach user details to the request object
        req.user = userDetails;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle JWT errors
        return next(new AppError("Invalid or expired token", 401));
    }
};

const authorizedRoles= (...roles) =>async(req,res,next)=>{
const currentUserRole = req.user.role;
if (!roles.includes(currentUserRole)){
    return next(new AppError("You do not have permission to access this route", 403))
}

next();
}

const authorizeSubscriber = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log("authorizeSubscriber",user);
    
    if (user.role !== "ADMIN" && user.subscription.status !== "active") {
      return next(new AppError("Please subscribe to access this route.", 403));
    }
  
    next();
  };

export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber,
};
