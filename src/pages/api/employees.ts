import sequelize from "@/lib/mssql";
import { NextApiRequest, NextApiResponse } from "next";

type INFOCENTEmployee = {
  ABALPH: string, // Nombre
  ABTAX: string,  // Cédula de identidad
  AIAN8: number,  // Ficha
  AIAC03: string, // Zona
  AIAC05: string, // Tipo de Cliente
  ALADD1: string, // Dirección detallada 1
  ALADD2: string, // Dirección detallada 2
  ALCTY1: string, // Urbanización
  ALCOUN: string, // Estado
  ABAC06: any,
}

const Employees = async (request: NextApiRequest, response: NextApiResponse) => {

  const queryString = `
    SELECT AIARC, AICO, AIARC, AIAN8, ABALPH, ABTAX, AIAC03, AIAC05, ALADD1, ALADD2, ALCTY1, ALCOUN, ABAC06
    FROM openquery(hveow001,'select * from proddta.f03012') 
    
    A join openquery (hveow001,'select * from proddta.f0101')
    C ON (A.AIAN8 = C.ABAN8) left JOIN OPENQUERY(HVEOW001,'SELECT * FROM PRODDTA.F0116')
    D ON (A.AIAN8 = D.ALAN8)
    
    WHERE AICO = '07200' 
    AND AIARC = 'EMP' 
    AND AIHOLD= ''
  `

  const [data] = await sequelize.query(queryString) as [INFOCENTEmployee[], unknown]

  const employees = data.map((employee): Employee => {
    return {
      name: employee.ABALPH,
      CI: employee.ABTAX,
      ficha: employee.AIAN8,
      zone: employee.AIAC03,
      clientType: employee.AIAC05,
      address: `${employee.ALADD1}${employee.ALADD2}`,
      birthState: employee.ALCOUN,
      birthNeighborhood: employee.ALCTY1,
      type: employee.ABAC06,
    }
  })

  response.status(200).json(employees)
}

export default Employees;