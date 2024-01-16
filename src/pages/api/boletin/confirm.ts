import sequelize from "@/lib/mssql";
import { NextApiRequest, NextApiResponse } from "next";
import { BulletinsFormat, getBulletinInfoQuery, getBulletinHeadersQuery } from "@/utils/getQueries";

type ResponseData = unknown

type BodyProps = {
  bulletin: BulletinsFormat
}

const handleBulletins = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  try {
    const { bulletin }: BodyProps = request.body
    console.log(bulletin)
    
    const headersQuery = getBulletinInfoQuery(bulletin)
    const infoQuery = getBulletinHeadersQuery(bulletin)

    await sequelize.query(headersQuery)
    await sequelize.query(infoQuery)

    response.json({
      message: "Succesful",
    })

  } catch (error: unknown) {
    response.status(400).json({
      error,
      message: "Error en la petición cabecera"
    })
  }
}

export default handleBulletins;

