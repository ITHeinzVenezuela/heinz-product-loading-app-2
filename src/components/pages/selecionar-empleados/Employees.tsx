import React, { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react'
import Button from '@/components/widgets/Button'
import EmployeeItem from './EmployeeItem'

type Props = {
  employees: Employee[],
  selectedList: boolean,
  handleSelectAll?: () => void,
  title: ReactNode,
  handleClean?: () => void,
  showDeleteButton?: boolean,
  selectedEmployees: Employee[],
  setSelectedEmployees: Dispatch<SetStateAction<Employee[]>>
}

const Employees = ({ employees, title, handleClean, showDeleteButton = false, handleSelectAll, ...employeesProps }: Props) => {

  // condition = condition ?? Boolean(products.length)

  return (
    <div className="Employees">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
        <div className="flex gap-4">
          {
            Boolean(handleSelectAll) &&
            <Button color="info" className="!py-2" onClick={handleSelectAll}>Todos</Button>
          }
          {
            Boolean(handleClean) && showDeleteButton &&
            <Button color="gray" className="!py-2" onClick={handleClean}>Limpiar</Button>
          }
        </div>
      </div>
      <div className="main_container">
        {
          employees.map((employee, index) =>
            <EmployeeItem key={index} employee={employee} {...employeesProps} />
          )
        }
      </div>
    </div>
  )
}

export default Employees