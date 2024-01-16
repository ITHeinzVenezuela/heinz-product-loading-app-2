
import { NextApiRequest, NextApiResponse } from "next";
import sequelize from "@/lib/mssql";
import { JDEBulletin } from ".";

const BulletinNextNumber = async (request: NextApiRequest, response: NextApiResponse) => {

  const queryString = `
    SELECT TOP 1 WOEDOC FROM [HCRM01].[dbo].[F9010] 
    ORDER BY WOEDOC DESC
  `

  const [data] = await sequelize.query(queryString) as [JDEBulletin[], unknown]
  const lastNumber = data[0].WOEDOC
  
  const bulletinNextNumber = lastNumber + 1;

  response.status(200).json(bulletinNextNumber)
}

export default BulletinNextNumber;