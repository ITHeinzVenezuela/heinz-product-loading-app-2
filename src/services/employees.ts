import axios from "axios"

export const getEmployees = async () => {
  const { data } = await axios.get<Employee[]>("/api/employees")
  return data;
}