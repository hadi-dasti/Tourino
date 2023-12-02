import { Request, Response,NextFunction } from "express";
import Joi from "joi";


// Function for validating the user authentication data
export const authUserValidation = (req: Request, res: Response, next: NextFunction) => {
    // Define the validation schema for the user authentication data
    const schemaAuthUser = Joi.object({
        fullName: Joi.string().min(5).pattern(/^[a-zA-Z\s]*$/).required().messages({
            'string.min': 'Full name must be at least 5 characters long',
            'string.pattern.base': 'Full name can only contain Persian or English characters',
            'any.required': 'Full name is required'
        }),
        mobileNumber: Joi.string().pattern(/^[0-9]{11}$/).required().messages({
            'string.pattern.base': 'Mobile number must be a 11-digit number',
            'any.required': 'Mobile number is required'
        })
    });

    try {
        // Validate the user authentication data against the defined schema
        const { error } = schemaAuthUser.validate(req.body, { abortEarly: true });

        if (error) {
            // If validation fails, return the error messages to the client
            const errorMessage = error.details.map(detail => detail.message);

            if (errorMessage) {
                return res.status(400).json({
                    success: false,
                    msg : errorMessage.join(',')// Join the error messages into a single string
                })
            }
        }
        // Move on to the next middleware if validation succeeds
        return next();

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg : "Internal server Error"
        })
    }

}

// Function for validating the OTP verification code
export const verifyCodeOtp = (req: Request, res: Response, next: NextFunction) => {
    // Define the validation schema for the OTP verification code 
    const schemaVerifyCode = Joi.object({
        otpCode: Joi.string()
            .length(6)
            .pattern(/^\d+$/)
            .required()
            .messages({
            'string.length': 'otpMobileCode must be exactly 6 characters long',
            'string.pattern.base': 'otpMobileCode must contain only digits',
            'any.required': 'otpMobileCode is required',
        })
    })
    try {
        const { error } = schemaVerifyCode.validate(req.body);

        if (error) {
            const errorMessage = error.details.map(detail => detail.message);

            if (errorMessage) {
                return res.status(400).json({
                    success: false,
                    msg: errorMessage.join(',')
                });
            };
        };

        return next();

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg : "Internal Server Error"
        })
    }
}