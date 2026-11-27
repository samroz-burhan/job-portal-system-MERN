
import sanitize from "mongo-sanitize";
import AppError from "../utils/AppError.js";

const validate = (schema) => {
    return (req, res, next) => {

        // 1. Sanitize incoming data
        const sanitizedData = sanitize(
            structuredClone(req.body ?? {})
        );

        // 2. Validate using Zod
        const validation = schema.safeParse(sanitizedData);

        // 3. Handle validation failure
        if (!validation.success) {

            const errors = validation.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            const error = new AppError("Validation failed", 400);

            // Attach Zod errors to this particular error
            error.errors = errors;

            return next(error);
        }

        // 4. Replace request body with validated data
        req.body = validation.data;

        // 5. Continue to controller
        next();
    };
};

export default validate;
