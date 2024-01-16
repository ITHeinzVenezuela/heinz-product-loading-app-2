import React, { useState } from 'react'
import DropZone from './DropZone'
import Button from '@/components/widgets/Button'
import { HandleNotification } from '@/hooks/useNotification'
import { getJsonFromExcel } from '@/utils'
import { activateEmployeeIDs } from '@/services/activar-ids'
import { handleError } from '@/services'

const filesAllowed = [
  {
    label: ".xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    label: ".png",
    type: "image/*",
  },
]

type Props = {
  handleNotification: HandleNotification
}

const MassivelyActivate = ({ handleNotification }: Props) => {
  const [inputFile, setInputFile] = useState<File>()
  const [employeeIDs, setEmployeeIDs] = useState<string[]>([])
  const [loadingEmployees, setLoadingEmployees] = useState<boolean>(false)

  const handleFiles = async (files: FileList) => {

    // Only the first archive will be accepted and/or validated
    const [file] = Array.from(files) // file.xlsx
    const allowedTypes = filesAllowed.map(item => item.type)

    if (allowedTypes.includes(file.type)) {
      setInputFile(file)

      try {

        const { rows, errors } = await getJsonFromExcel(file)

        console.log('info', rows)
        console.log('errors', errors)

        // Si rows viene vacío es porque no pasaron el archivo excel con el formato adecuado
        if (rows.length) {

          handleNotification.open({
            type: "success",
            title: "Archivo Procesado",
            message: `El archivo se ha procesado correctamente 👍`
          })

          const fichas = [...new Set(rows.map(employee => employee.ficha.toString()))]

          // Se guardan las fichas en el estado
          setEmployeeIDs(fichas)

        } else {
          handleNotification.open({
            type: "danger",
            title: "Archivo Incompatible",
            message: `El archivo ".xlsx" proporcionado no sigue el adecuado formato de entrada`
          })
          setEmployeeIDs([])
        }

      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleButton = async () => {
    
    handleNotification.close()
    
    try {
      setLoadingEmployees(true)
      await activateEmployeeIDs(employeeIDs)
  
      handleNotification.open({
        type: "success",
        title: "Activación de Fichas",
        message: `Las fichas se han activado exitosamente ✅`
      })
  
      setEmployeeIDs([])
      setLoadingEmployees(false)
      
    } catch (error) {
      handleError(error)
      setLoadingEmployees(false)
    }
  }

  const isActive: boolean = !Boolean(employeeIDs.length) || loadingEmployees
  console.log('employeeIDs', employeeIDs)

  return (
    <div className="MassivelyActivate">
      <DropZone
        loadingEmployees={loadingEmployees}
        filesAllowed={filesAllowed}
        handleFiles={handleFiles}
        setLoadingEmployees={setLoadingEmployees}
      >
        Activación de fichas <small>(carga masiva)</small>
      </DropZone>

      <div className="flex justify-end pt-8 font-bold">
        <Button onClick={handleButton} color="info" disabled={isActive}>
          Activar Empleados
        </Button>
      </div>
    </div>
  )
}

export default MassivelyActivate;