import { NextApiRequest, NextApiResponse } from "next";

import speakeasy from "speakeasy"
import qrcode from "qrcode"
import jwt from 'jsonwebtoken'
import authorizationHandler from "@/utils/api/authorizationHandler";
type BodyProps = {
  email: string,
}

type JWT_TOKEN = {
  sub: number;
  is_admin: boolean,
}

const GenerateQRCode = (request: NextApiRequest, response: NextApiResponse<unknown>) => {

  const { email }: BodyProps = request.body
  
  authorizationHandler(request, response, (payload) => {
    const secret = speakeasy.generateSecret({
      name: email
    })

    if (secret.otpauth_url) {

      qrcode.toDataURL(secret.otpauth_url, (error, qrcode) => {

        response.status(200).json({
          qrcode,
          code: secret.ascii,
        })

      })

    } else {

      response.status(500).json({
        message: "There has been an error generating de QR code"
      })

    }

  })

}

export default GenerateQRCode;