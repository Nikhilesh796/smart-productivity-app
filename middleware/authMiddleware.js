export const protect = async (req, res, next) => {
    const { default: User } = await import("../models/userModel.js");
    console.log("Middleware executed!");
    next();
};

export const verifyToken = async (req, res, next) => {
    console.log("Verifying Token...");
    next();
};

export const verifyTokenAndAdmin = async (req, res, next) => {
    console.log("Checking Admin Access...");
    next();
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
    console.log("Checking User Authorization...");
    next();
};