import React, { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react'
import Select from '../widgets/Select'
import Input from '../widgets/Input'
import { filterByNumbers } from '@/utils'
import Button from '../widgets/Button'
import useAuth from '@/hooks/useAuth'

type Props = {
  loading: boolean,
  DINT_FIND_PRODUCTS: boolean,
  products: Product[],
  setSearching: Dispatch<SetStateAction<boolean>>,
  setSearchedProducts: Dispatch<SetStateAction<Product[]>>,
}

const ProductFinder = ({ loading, products, setSearching, setSearchedProducts, DINT_FIND_PRODUCTS }: Props) => {

  const [renderPage, credentials] = useAuth({})
  const { nombre } = credentials.user

  const [search, setSearch] = useState<number | "">("")

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const value = filterByNumbers(target.value)

    if (target.value === "") {

      debugger
      setSearch(target.value)
      setSearching(false)

    } else if (!isNaN(value)) {

      setSearch(value)
      setSearching(true)

      if (products.length) {
        setSearchedProducts(
          products.filter(product =>
            product.sku.includes(value.toString())
          )
        )
      }
    }
  }

  const options = [{ name: "", value: "" }]

  console.log('search', search)

  return (
    <>
      <form className="ProductFinder">
        {/* <Select title="" defaultOption="Categorías" options={options} required={false} /> */}
        <span className="hidden sm:block font-bold">Buscar Producto</span>
        <div className="flex items-center">
          <Input
            id="search"
            title=""
            value={search}
            className="w-full"
            placeholder="🔍 Product SKU"
            onChange={handleChange}
          />
          {/* <Button type="submit" color="info" className="w-full xx_sm:w-auto !px-8 !rounded-none">Buscar</Button> */}

          {
            search &&
            <Button
              color="danger"
              className="w-auto !px-8 !rounded-none"
              onClick={() => {
                setSearch("")
                setSearching(false)
              }}
            >
              X
            </Button>
          }
        </div>
        <span>Bienvenido <strong className="text-cyan-600">{nombre.split(" ")[0]}</strong></span>
      </form>

      {
        !loading && DINT_FIND_PRODUCTS &&
        <p className="pt-8">No se ha encontrado ningún producto por <span className="font-bold">&quot;{search}&quot;</span></p>
      }
    </>
  )
}

export default ProductFinder