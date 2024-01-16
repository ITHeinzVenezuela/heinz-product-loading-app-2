import sequelize from "@/lib/mssql";
import { NextApiRequest, NextApiResponse } from "next";

type JDEBulletinHeader = {
  ODEDOC: number, // Numero de boletin
  ODLITM: string, // SKU
  ODDSC1: string, // Nombre del Producto
  ODSOQS: number, // Cantidad de Cajas seleccionadas del producto
  ODUPRC: number, // Precio Base del Producto
  ODAMXT: number, // Total (Precio Base x Cantidad de Cajas)
  ODMCU: string, // Almacén
  ODTMST: string, // Fecha
  ODLTTR: string, // Estado (999 = No concretado | 010 = Concretado)
  ODUSER: string, // Usuario
  ODAN8: number, // Ficha
  ODAC03: string, // Zona
}

export type BulletinHeader = {
  number: number;
  product: Product;
  store: string;
  date: string;
  user: string;
  ficha: number;
  zone: string;
}

type BodyProps = {
  bulletinNumber: number
}

const BulletinInfo = async (request: NextApiRequest, response: NextApiResponse) => {

  const { bulletinNumber }: BodyProps = request.body

  const queryString = `
    SELECT * FROM [HCRM01].[dbo].[F9011] 
    WHERE ODEDOC = ${bulletinNumber}
    ORDER BY ODTMST DESC
  `
  const [data] = await sequelize.query(queryString) as [JDEBulletinHeader[], unknown]

  const bulletins: BulletinHeader[] = data.map((bulletin) => {
    return {
      number: bulletin.ODEDOC,
      product: {
        sku: bulletin.ODLITM,
        name: bulletin.ODDSC1,
        quantity: bulletin.ODSOQS,
        price: bulletin.ODUPRC,
        available: 0,
        image: `/product-images/${bulletin.ODLITM}.png`,
        details: { // Valor innecesario en esta parte del código
          UMCONV: 0,
          IBITM: 0,
          IMSRP1: "",
          IMSRP2: "",
          IMSRP3: "",
          IMSRP4: "",
        }
      },
      // Total (Precio Base x Cantidad de Cajas): bulletin.ODAMXT,
      store: bulletin.ODMCU.trim(),
      date: bulletin.ODTMST,
      user: bulletin.ODUSER,
      ficha: bulletin.ODAN8,
      zone: bulletin.ODAC03,
    }
  })

  response.status(200).json(bulletins)
}

export default BulletinInfo;
