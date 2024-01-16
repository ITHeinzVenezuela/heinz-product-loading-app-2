import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react'
import { FaRegCircleCheck, FaXmark } from 'react-icons/fa6'

type Props = {
  employee: Employee,
  selectedList?: boolean,
  selectedEmployees: Employee[],
  setSelectedEmployees: Dispatch<SetStateAction<Employee[]>>
}

const EmployeeItem = ({ employee, selectedList, selectedEmployees, setSelectedEmployees }: Props) => {

  const found = selectedEmployees.find(item => item.ficha === employee.ficha)

  const handleSelect: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (!selectedList) {
      !found
        ? setSelectedEmployees([...selectedEmployees, employee])
        : handleDelete()
    }
  }

  const handleDelete = () => {
    setSelectedEmployees(selectedEmployees.filter(item => item.ficha !== employee.ficha))
  }

  const { ficha, name } = employee
  return (
    <div className={`EmployeeItem ${(selectedList) ? "selected" : ""}`} onClick={handleSelect}>
      <p><span>{ficha}</span> - {name}</p>
      {
        selectedList &&
        <button type="button" onClick={handleDelete} className="p-2 text-xs rounded-lg bg-gray-600 hover:bg-red-400">
          <FaXmark className="fill-white"/>
        </button>
      }
      {
        found && !selectedList &&
        <span><FaRegCircleCheck className="fill-emerald-500"/></span>
      }
    </div>
  )
}

export default EmployeeItem;