

export interface AuthUserCredentialsDto{
    id:string
    fullName: string // The full name of the user for authentication
    mobileNumber: string// The mobile number of the user for authentication
}

export interface VerifyUserOtpMobileCredentialsDto{
    mobileNumber:string
    otpCode:string  // One-time password for mobile verification
}