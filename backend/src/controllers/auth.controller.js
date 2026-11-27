import userModel from "../models/user.model.js";
import sanitize from "mongo-sanitize";

/**
 * - Create an account
 * - API: POST /api/auth/accounts
 */

export const registerUser = async (req, res) => {
  const {
    fullName,
    email,
    password,
    role,
    termsAccepted,
    isVerified,
  } = req.body;

  return res.status(201).json({
    message: "API working properly",
    user: {
      fullName,
      email,
      password,
      role,
      termsAccepted,
      isVerified,
    },
  });
};
