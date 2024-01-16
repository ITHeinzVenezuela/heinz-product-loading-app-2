import sequelize from "@/lib/mssql";
import { NextApiRequest, NextApiResponse } from "next";
import { UserTable } from "./auth/login";
import { getSQLValue } from "@/utils/getQueries";
import parseUserToDB from "@/utils/api/parseUserToDB";

const getUsers = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const queryString = `SELECT * FROM HCRM01.dbo.usuarios`
    const [data] = await sequelize.query(queryString) as [UserTable[], unknown]

    const users = data.map((user): User => {
      return {
        ...user,
        is_admin: Boolean(user.is_admin),
        password_login_available: Boolean(user.password_login_available),
      }
    })

    response.json(users)

  } catch (error) {
    response.status(500).json({
      status: 500,
      message: "There's occured an error!"
    })
  }
}

const createUser = async (request: NextApiRequest, response: NextApiResponse) => {

  const user = parseUserToDB(request.body)

  const keys = Object.keys(user).join(", ")
  const values = Object.values(user).map(value => getSQLValue(value)).join(", ")

  try {
    const queryString = `INSERT INTO HCRM01.dbo.usuarios (${keys}) VALUES (${values});`

    const [data] = await sequelize.query(queryString) as [unknown[], unknown]
    response.json(data)

  } catch (error) {
    response.status(500).json({
      status: 500,
      message: "There's occured an error!"
    })
  }
}

const updateUser = async (request: NextApiRequest, response: NextApiResponse) => {
  try {

    const { id }: User = request.body
    const user = parseUserToDB(request.body)
    const keys = Object.entries(user).map(item => `${item[0]} = ${getSQLValue(item[1])}`).join(", ")
    
    const queryString = `
      UPDATE HCRM01.dbo.usuarios 
      SET ${keys}
      WHERE id = ${id};
    `
    console.log(queryString)
    
    const [data] = await sequelize.query(queryString) as [unknown[], unknown]
    response.json(data)

  } catch (error) {
    response.status(500).json({
      status: 500,
      message: "There's occured an error!"
    })
  }
}

const deleteUser = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { id } = request.query

    const queryString = `
      DELETE FROM HCRM01.dbo.usuarios
      WHERE id = ${id};
    `
    const [data] = await sequelize.query(queryString) as [unknown[], unknown]
    response.json(data)

  } catch (error) {
    response.status(500).json({
      status: 500,
      message: "There's occured an error!"
    })
  }
}

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "GET") {
    getUsers(request, response)
  }
  if (request.method === "POST") {
    createUser(request, response)
  }
  if (request.method === "PUT") {
    updateUser(request, response)
  }
  if (request.method === "DELETE") {
    deleteUser(request, response)
  }
}

export default userHandler;