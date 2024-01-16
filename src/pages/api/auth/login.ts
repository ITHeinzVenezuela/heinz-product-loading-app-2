import sequelize from "@/lib/mssql";
import { LoginRequest } from "@/services/auth";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"

export interface UserTable extends Omit<User, "is_admin" | "password_login_available"> {
  is_admin: number,
  password_login_available: number,
}

const LoginHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email, password }: LoginRequest = request.body

  const queryString = `
    SELECT * FROM HCRM01.dbo.usuarios
    WHERE email = '${email}'
  `
  try {

    const [data] = await sequelize.query(queryString) as [UserTable[], unknown]

    console.log('data', data)
    
    if (data.length) {
      const user = {
        ...data[0],
        is_admin: Boolean(data[0].is_admin),
        password_login_available: Boolean(data[0].password_login_available),
      }

      const generateJWT = () => {
        const secret = process.env.JWT_SECRET || ""
        const payload = {
          sub: user.id,
          is_admin: user,
        }

        console.log('secret', secret)
        console.log('payload', payload)
        
        const token = jwt.sign(payload, secret)
        response.json({ user, token })
      }

      if (password) {

        if(user.password_login_available){
          
          if (user.email === email && user.password === password) {
  
            generateJWT()
  
          } else {
  
            response.status(400).json({
              status: 400,
              message: "Usuario y/o contraseña son incorrectos"
            })
            
          }
          
        }else{
          
          response.status(400).json({
            status: 400,
            message: "No tienes permitido ingresar con contraseña, solicita los permisos necesarios al administrador"
          })
          
        }
        

      } else {
        
        if (user.two_factor_auth) {
          console.log('user.two_factor_auth', user.two_factor_auth)
          generateJWT()

        } else {
          
          response.status(400).json({
            status: 400,
            message: "No tienes configurado el Autenticador, solicita un ingreso mediante contraseña"
          })
          
        }
        
      }

    } else {
      
      response.status(400).json({
        status: 400,
        message: "Usuario no ha sido encontrado"
      })
      
    }

  } catch (error) {
    response.status(500).json({
      status: 500,
      message: "There's occured an error!"
    })
  }

}

export default LoginHandler;