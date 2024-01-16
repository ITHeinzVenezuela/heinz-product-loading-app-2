import axios from "axios"

export const getProducts = async (productIDs?: Product["sku"][]) => {
  const { data } = await axios.post<Product[]>("/api/products", { productIDs })
  console.log('data', data)
  return data;
}