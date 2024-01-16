import axios from "axios"

export const activateEmployeeIDs = async (idList: string[]) => {
  const body = { idList }
  const response = await axios.post("/api/activar-ids", body)
  console.log('response', response)
}