import userModel from "../models/user.model.js";

/**
 * - Create an account
 * - API: POST /api/auth/accounts
 */


export async function registerUser(req, res) {
    return res.status(200).json({message: "test"})
}