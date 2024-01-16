import axios from "axios";
import { BulletinsProps } from "@/pages/api/boletin";
import { BulletinHeader } from "@/pages/api/boletin/info";
import { BulletinsFormat } from "@/utils/getQueries";

export const getBulletins = async (body: BulletinsProps) => {
  const { data } = await axios.post<Bulletin[]>("/api/boletin", body)
  return data;
}

export const getBulletinInfo = async (bulletinNumber: number) => {
  const { data } = await axios.post<BulletinHeader[]>("/api/boletin/info", { bulletinNumber })
  return data;
}

export const getBulletinNextNumber = async () => {
  const { data } = await axios.get<number>("/api/boletin/next-number")
  return data;
}

export const sendBulletin = async (bulletin: BulletinsFormat): Promise<any> => {
  const {data} = await axios.post("/api/boletin/confirm", { bulletin })
  return data
}