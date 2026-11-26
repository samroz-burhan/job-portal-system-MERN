import userModel from "../models/user.model.js";
import sanitize from "mongo-sanitize";

/**
 * - Create an account
 * - API: POST /api/auth/accounts
 */

export async function registerUser(req, res) {
    const { fullname, email, password, role, termsAccepted } = sanitize(req.body);

    res.json({ fullname, email, password, role, termsAccepted })
}