import sequelize from "@/lib/mssql";
import { NextApiRequest, NextApiResponse } from "next";

export type JDEBulletin = {
  WOEDOC: number;
  WOEDCT: string;
  WOMCU: string;
  WOEKCO: string;
  WOAN8: number;
  WOALPH: string;
  WOASN: string;
  WOCPGP: string;
  WOADD1: string;
  WOAC03: string;
  WOAC05: string;
  WOZON: string;
  WOVR01: string;
  WODEL1: string;
  WOTRDJ: string; // Date
  WODRQJ: string; // Date
  WOURDT: string; // Date
  WOAAT1: string;
  WOTMSTP: string; // Date
  WOUSER: string;
  WOJOBN: string;
}

export type BulletinsProps = {
  dateFrom?: string,
  dateTo?: string,
  bulletinNumber?: number
}

const Bulletins = async (request: NextApiRequest, response: NextApiResponse) => {

  const getQuery = () => {
    const { dateFrom, dateTo, bulletinNumber }: BulletinsProps = request.body;
    let queryString = ""

    if (dateFrom && dateTo) {

      const query1 = `WHERE WOTRDJ'${dateFrom} 00:00:00.000'`
      const query2 = `WHERE WOTRDJ BETWEEN '${dateFrom} 00:00:00.000' AND '${dateTo} 00:00:00.000'`

      queryString = `
        ${!dateTo ? query1 : query2}
        ORDER BY WOEDOC DESC
      `

    } else if (bulletinNumber) {

      queryString = `
        WHERE WOEDOC = ${bulletinNumber}
      `
    }

    return `SELECT * FROM [HCRM01].[dbo].[F9010] ${queryString}`;
  }

  const queryString = getQuery()

  const [data] = await sequelize.query(queryString) as [JDEBulletin[], unknown]

  const bulletins: Bulletin[] = data.map((bulletin) => {
    return {
      number: bulletin.WOEDOC,
      name: bulletin.WOALPH,
      user: bulletin.WOUSER,
      ficha: bulletin.WOAN8,
      address: bulletin.WOADD1,
      zone: bulletin.WOAC03,
      clientType: bulletin.WOAC05,
      order: bulletin.WOVR01,
      store: bulletin.WOMCU,
      details: bulletin.WODEL1,
      date: bulletin.WOTMSTP,
    }
  })

  response.status(200).json(bulletins)
}

export default Bulletins;