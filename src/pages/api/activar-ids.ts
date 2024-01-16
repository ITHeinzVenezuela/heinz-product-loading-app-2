import sequelize from "@/lib/mssql";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

type ResponseData = unknown

type BodyProps = {
  idList: string[]
}

const EmployeeIDListSchema = z.array(z.string().nonempty())

const activateEmployeeIDs = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  try {
    const { idList }: BodyProps = request.body
    console.log('idList', idList)

    const validatedList = EmployeeIDListSchema.parse(idList)
    // --Activar ficha en JDE

    const idListString = `${validatedList.map(item => `''${item}''`)}`;
    
    // Activar ficha en JDE
    const queryString = `
      Update openquery(
        hveow001,
        'select * from proddta.f03012 
        where aian8 in (${idListString})'
      ) 
      set aihold=''
    `
    console.log('queryString', queryString)

    const [data] = await sequelize.query(queryString)
    console.log('response', data)
    response.status(204).end("ok")

  } catch (error: unknown) {
    response.status(400).json(error)
  }
}

export default activateEmployeeIDs;
