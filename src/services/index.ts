import { AxiosError } from "axios"

export const handleError = (error: unknown) => {

  if (error instanceof AxiosError) {
    console.error(error.message)
    console.error(error.response?.data)
  } else {
    console.error(error)
  }

}