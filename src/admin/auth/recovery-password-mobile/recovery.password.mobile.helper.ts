// CREATE RANDOM OTP FOR mobileNumber
export const GenerateOtp = (otplLngth: number): string => {
  const digits: string = '0123456789';

  let otp = '';

  for (let i = 0; i < otplLngth; i++) {
    otp += digits[Math.floor(Math.random() * otplLngth)];
  }
  return otp;
};
