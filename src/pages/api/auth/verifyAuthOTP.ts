import { NextApiRequest, NextApiResponse } from "next";

import speakeasy from "speakeasy"
import { VerifyAuthOTP } from "@/services/auth";

const GenerateQRCode = (request: NextApiRequest, response: NextApiResponse<unknown>) => {

  const { secret, OTPCode }: VerifyAuthOTP = request.body
  
  try {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "ascii",
      token: OTPCode,
    })
    
    response.json({ verified })

  } catch (error) {
    response.status(500).json({
      message: "There has been an error verifying OTP Code"
    })
  }
}

export default GenerateQRCode;