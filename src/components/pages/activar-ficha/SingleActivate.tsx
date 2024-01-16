import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import Button from '@/components/widgets/Button'
import { HandleNotification } from '@/hooks/useNotification'
import { activateEmployeeIDs } from '@/services/activar-ids'
import { handleError } from '@/services'

type Props = {
  handleNotification: HandleNotification
}

const { isInteger } = Number

const SingleActivate = ({ handleNotification }: Props) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [employeeID, setEmployeeID] = useState<number | string>("")

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    debugger

    if (isInteger(employeeID)) {
      try {
        setLoading(true)
        await activateEmployeeIDs([employeeID.toString()])

        handleNotification.open({
          type: "success",
          title: "Activación de Ficha",
          message: `La ficha se ha activado exitosamente ✅`
        })

        setEmployeeID("")
        setLoading(false)

      } catch (error) {
        handleError(error)
        setLoading(false)
      }
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    // const digits = target.value.toString().length
    const number = parseInt(target.value)
    
    if(number <= 1099999 && number > 0 && isInteger(number)){
      setEmployeeID(parseInt(target.value))
    }
    if(target.value === ""){
      setEmployeeID("")
    }
  }

  return (
    <form className="SingleActivate" onSubmit={handleSubmit}>
      <label htmlFor="activar-ficha" className="Input pb-8">
        <h1 className="SingleActivate__title">Activar Ficha indivual</h1>

        <div className="activation-input">
          <input id="activar-ficha" placeholder="💼 Ficha de Trabajador" type="number" value={employeeID} onChange={handleChange} />

          <Button type="submit" color="info" loading={loading} disabled={!employeeID || loading}>
            <span>Activar</span>
          </Button>
        </div>

      </label>
    </form>
  )
}

export default SingleActivate