import authorizationConfig from "@/utils/api/authorizationConfig";
import axios from "axios"
import { type } from "os";

type AuthQRCodeResponse = {
  qrcode: string,
  code: string,
}

export type VerifyAuthOTP = {
  secret: string;
  OTPCode: string;
}

export type LoginRequest = {
  email: string,
  password?: string,
}

export type Set2FactorAuth = {
  email: string,
  two_factor_auth: string,
}

class AuthService {
  login = async (body: LoginRequest) => {
    const { data } = await axios.post<AuthCredentials>("/api/auth/login", body)
    return data;
  }
  
  getAuthQRCode = async (email: string, token: string) => {
    const config = authorizationConfig(token)
    const { data } = await axios.post<AuthQRCodeResponse>("/api/auth/qrcode", { email }, config)
    return data;
  }
  
  verifyAuthOTP = async (body: VerifyAuthOTP) => {
    debugger
    const { data } = await axios.post<{ verified: boolean }>("/api/auth/verifyAuthOTP", body)
    return data.verified;
  }
}

export default AuthService;