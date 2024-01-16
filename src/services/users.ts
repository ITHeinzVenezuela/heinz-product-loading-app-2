import axios from "axios"
import { config } from "dotenv";

class UserService {
  getUsers = async () => {
    const { data } = await axios.get<User[]>("/api/users")
    return data;
  }

  createUser = async (user: User) => {
    const { data } = await axios.post<User>("/api/users", user)
    return data;
  }

  updateUser = async (user: User) => {
    const { data } = await axios.put<User>("/api/users", user)
    return data;
  }

  deleteUser = async (id: User["id"]) => {
    const config = { params: { id } }
    const { data } = await axios.delete<User[]>("/api/users", config)
    return data;
  }
}

export default UserService