import React, { useState, useEffect, ChangeEventHandler, FormEventHandler, Dispatch, SetStateAction } from 'react'
import Button from '@/components/widgets/Button'
import Input from '@/components/widgets/Input'
import { Dates, OPTIONS } from '@/pages/mis-ordenes'
import { BulletinsProps } from '@/pages/api/boletin'
import { TODAY, formatDateString } from '@/utils/parseDate'
import { subWeeks } from 'date-fns'
import { HandleNotification } from '@/hooks/useNotification'
import { getBulletins } from '@/services/boletin'

type Props = {
  option: OPTIONS,
  handleNotification: HandleNotification,
  setBulletins: Dispatch<SetStateAction<Bulletin[]>>
  setLoading: Dispatch<SetStateAction<boolean>>,
}

const MyOrdersForm = ({  option, handleNotification, setLoading, setBulletins }: Props) => {

  const [bulletinNumber, setBulletinNumber] = useState<number | "">("")

  const [dates, setDates] = useState<Dates>({
    dateFrom: formatDateString(subWeeks(TODAY, 1)),
    dateTo: formatDateString(),
  })
  
  useEffect(() => {
    searchBulletins(dates)
  }, [])

  const searchBulletins = async (body: BulletinsProps) => {
    setLoading(true)
    handleNotification.close()
    try {

      const data = await getBulletins(body)
      setBulletins(data)

    } catch (error) {

      console.log('error', error)
      handleNotification.open({
        type: "danger",
        title: "Error ❌",
        message: "Ha habido un error intentado traer los boletines, intente de nuevo",
      })

    } finally {
      setLoading(false)
    }
  }
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    debugger
    if (name === "search-order") {
      const number = parseInt(value)
      setBulletinNumber(value !== "" ? number : "")
    } else {
      setDates({
        ...dates, [name]: value
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    if (option === OPTIONS.DATE) {
      await searchBulletins(dates)
    }
    if (option === OPTIONS.BOLETIN_NUMBER && bulletinNumber) {
      await searchBulletins({ bulletinNumber })
    }
  }
  
  const { dateFrom, dateTo } = dates

  return (
    <form onSubmit={handleSubmit} className="MyOrders__options pb-10">
      {
        option === OPTIONS.DATE &&
        <>
          <Input id="dateFrom" onChange={handleChange} value={dateFrom} title="Desde" type="date" />
          <Input id="dateTo" onChange={handleChange} value={dateTo} title="Hasta" type="date" />
        </>
      }

      {
        option === OPTIONS.BOLETIN_NUMBER &&
        <>
          <Input
            id="search-order"
            title="Buscar"
            value={bulletinNumber}
            type="number"
            placeholder="📄 Número de Boletín"
            className="col-start-1 col-end-3"
            onChange={handleChange}
          />
        </>
      }

      <Button type="submit" color="secondary">
        Buscar
      </Button>
    </form>
  )
}

export default MyOrdersForm