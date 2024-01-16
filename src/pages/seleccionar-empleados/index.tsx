import React, { ChangeEventHandler, FormEventHandler, MouseEventHandler, useContext, useEffect, useState } from 'react'
import Employees from '@/components/pages/selecionar-empleados/Employees'
import Header from '@/components/widgets/Header/Header'
import Input from '@/components/widgets/Input'
import Select from '@/components/widgets/Select'
import { filterByNumbers, getJsonFromExcel } from '@/utils'
// import getEmployees from '@/utils/getEmployees'
import Textarea from '@/components/widgets/Textarea'
import Button from '@/components/widgets/Button'
import { useRouter } from 'next/router'
import Form from '@/components/widgets/Form'
import NotificationModal from '@/components/widgets/NotificationModal'
import useNotification from '@/hooks/useNotification'
import CartContext from '@/context/CartContext'
import DropZone from '@/components/pages/activar-ficha/DropZone'
import { FaArrowRight } from 'react-icons/fa6'
import { getEmployees } from '@/services/employees'
import Spinner from '@/components/widgets/Spinner'
import { getRandomID } from '@/utils/getRandomID'
import useAuth from '@/hooks/useAuth'

type HandleFormProps = {
	submit: FormEventHandler<HTMLFormElement>,
	invalid: () => void,
}

const filesAllowed = [
	{
		label: ".xlsx",
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	}
]

enum EMPLOYEES_LIST {
	TODOS = "0",
	SAN_JOAQUÍN = "752",
	OBREROS_SAN_JOAQUIN = "751",
	LAS_MERCEDES = "753",
	LA_CALIFORNIA = "754",
	BARCELONA = "755",
	PUERTO_ORDAZ = "756",
	BAQUISIMETO = "757",
	MARACAIBO = "758",
	SAN_CRISTOBAL = "759",
	OBREROS_DISTRIBUCION = "760",
	PASANTES = "761",
}

const { SAN_JOAQUÍN, LAS_MERCEDES, LA_CALIFORNIA, BARCELONA } = EMPLOYEES_LIST
const { PUERTO_ORDAZ, BAQUISIMETO, MARACAIBO, SAN_CRISTOBAL } = EMPLOYEES_LIST
const { OBREROS_SAN_JOAQUIN, OBREROS_DISTRIBUCION, PASANTES, TODOS } = EMPLOYEES_LIST

const SelectEmployees = () => {

	const router = useRouter()
	const context = useContext(CartContext)
	
  const [renderPage, credentials] = useAuth({})

	const { cart, purchase, setPurchase } = context
	const { selectedEmployees, setSelectedEmployees } = context

	const [loading, setLoading] = useState<boolean>(false)
	const [loadingEmployees, setLoadingEmployees] = useState<boolean>(false)


	const [employees, setEmployees] = useState<Employee[]>([])
	const [employeesGroup, setEmployeesGroup] = useState<Employee[]>([])

	const [searching, setSearching] = useState<boolean>(false)
	const [searchedEmployees, setSearchedEmployees] = useState<Employee[]>([])
	// const [selectedEmployees, setSelectedEmployees] = useState<WorkerEmployee[]>([])

	const [search, setSearch] = useState<number | string>("")

	const [alert, handleAlert] = useNotification()

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)

				setPurchase({
					...purchase,
					id: getRandomID(),
				})

				const employees = await getEmployees()
				setEmployees(employees)
				setEmployeesGroup(employees)

				setLoading(false)

			} catch (error) {
				console.log(error)
				setLoading(false)
			}
		})()
	}, [])

	const handleForm: HandleFormProps = {
		submit: (event) => {
			event.preventDefault()

			if (!selectedEmployees.length) {

				debugger
				handleForm.invalid()

			} else {

				router.push("/cart")

			}

		},
		invalid: () => {
			handleAlert.open({
				type: "danger",
				title: "Faltan campos",
				message: "Debes llenar los campos resaltados y seleccionar al menos 1 empleado para poder avanzar",
			})
		}
	}

	const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {

		const { name, value } = target

		if (name !== "ficha-search") {

			setPurchase({
				...purchase, [name]: value
			})

		} else {
			if (target.value === "") {

				setSearch("")
				setSearching(false)

			} else {

				if (isNaN(parseInt(value))) {

					setSearch(value)
					setSearching(true)

					setSearchedEmployees(
						employees.filter(employee =>
							employee.name.toLowerCase().includes(value.toLowerCase())
						)
					)

				} else {
					const value = filterByNumbers(target.value)

					setSearch(value)
					setSearching(true)

					setSearchedEmployees(
						employees.filter(employee =>
							employee.ficha.toString().includes(value.toString())
						)
					)
				}
			}
		}
	}

	const handleClean = {
		search: () => {
			setSearch("")
			setSearching(false)
			setSearchedEmployees([])
			console.log("hola");
		},
		selected: () => {
			setSelectedEmployees([])
		}
	}

	const handleFiles = async (files: FileList) => {

		const [file] = Array.from(files)
		const allowedTypes = filesAllowed.map(item => item.type)

		if (allowedTypes.includes(file.type)) {
			const { rows, errors } = await getJsonFromExcel(file);
			const newList = [...selectedEmployees]

			rows.forEach(inserted => {
				const findEmployee = (employee: Employee) => {
					return employee.ficha === inserted.ficha
				}

				const exists = employees.find(findEmployee)
				const notSelected = !selectedEmployees.find(findEmployee)

				// Verifica si la ficha existe en la base de datos y si ya fue seleccionada
				if (exists && notSelected) newList.push(exists)
			})

			console.log('info', rows)
			console.log('errors', errors)
			console.log('newList', newList)
			setSelectedEmployees(newList)
		}
	}

	const handleChangeList: ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
		const { value } = currentTarget
		
		const filteredEmployees = (value: string) => {
			const filtered = employees.filter(employee => employee.type === value)
			return filtered;
		}

		if (value === OBREROS_SAN_JOAQUIN) {
			
			const obreros = filteredEmployees(OBREROS_SAN_JOAQUIN)
			const obreros_distribucion = filteredEmployees(OBREROS_DISTRIBUCION)
			setEmployeesGroup([...obreros, ...obreros_distribucion])
			
		} else {
			const filtered = filteredEmployees(value)
			setEmployeesGroup(value === TODOS ? employees : filtered)
		}
	}

	const handleSelectAll = () => {
		const filtered = employeesGroup.filter((employee) => {
			const found = selectedEmployees.find((selected) => selected.ficha === employee.ficha)
			return Boolean(!found) // Se sacan de la lista los que ya estaban seleccionados para que salgan repetidos
		})
		setSelectedEmployees([...selectedEmployees, ...filtered])
	}

	const employeeListTitle = (
		<>Lista de empleados <small>({searching ? searchedEmployees.length : employeesGroup.length})</small></>
	)

	const employeesProps = {
		selectedList: false,
		selectedEmployees,
		setSelectedEmployees
	}

	const selectedEmployeesProps = { ...employeesProps, selectedList: true }

	const DropZoneProps = {
		loadingEmployees,
		filesAllowed,
		setLoadingEmployees,
		handleFiles,
	}

	const employeesGroups = [
		{
			name: "TODOS",
			value: TODOS
		},
		{
			name: "Empleados San Joaquín",
			value: SAN_JOAQUÍN
		},
		{
			name: "Emp. Suc. Las Mercedes",
			value: LAS_MERCEDES
		},
		{
			name: "Emp. Suc. La California",
			value: LA_CALIFORNIA
		},
		{
			name: "Emp. Suc. Barcelona",
			value: BARCELONA
		},
		{
			name: "Emp. Suc. Puerto Ordaz",
			value: PUERTO_ORDAZ
		},
		{
			name: "Emp. Suc. Baquisimeto",
			value: BAQUISIMETO
		},
		{
			name: "Emp. Suc. Maracaibo",
			value: MARACAIBO
		},
		{
			name: "Emp. Suc. San Cristobal",
			value: SAN_CRISTOBAL
		},
		{
			name: "Obreros",
			value: OBREROS_SAN_JOAQUIN
		},
		{
			name: "Pasantes",
			value: PASANTES
		},
	]

	return (
		renderPage &&
		<>
			<div className="SelectEmployees Layout">
				<Header />
				<main className="pt-10 xl:px-60">

					<Form onSubmit={handleForm.submit} onInvalid={handleForm.invalid}>
						<h1 className="text-3xl font-bold pb-10">Selecionar Empleados</h1>

						<>
							{
								!loading ?
									<>
										<div className="grid grid-cols-2 gap-8 pb-8">
											<Input
												id="ficha-search"
												title="Buscar por"
												placeholder="💼 Nombre | Ficha"
												value={search}
												onChange={handleChange}
												required={false}
											/>

											<Select
												id="order"
												title="Filtrar por tipo"
												defaultOption="Lista de empleados"
												onChange={handleChangeList}
												options={employeesGroups}
											/>
										</div>

										<div className="Employee-grid">
											{
												searching ?
													// Siempre aparecerá el botón de limpiar
													<Employees
														// handleSelectAll={() => { }}
														showDeleteButton={true}
														title={employeeListTitle}
														handleClean={handleClean.search}
														employees={searchedEmployees}
														{...employeesProps}
													/>
													:
													// No aparecerá el botón de limpiar
													<Employees
														handleSelectAll={handleSelectAll}
														title={employeeListTitle}
														employees={employeesGroup}
														{...employeesProps}
													/>
											}

											<Employees
												// Botón de limpiar aparecerá cuando hayan items en la lista
												title={<>Seleccionados <small>({selectedEmployees.length})</small></>}
												handleClean={handleClean.selected}
												showDeleteButton={Boolean(selectedEmployees.length)}
												employees={selectedEmployees}
												{...selectedEmployeesProps}
											/>
										</div>

										<DropZone {...DropZoneProps}>
											Cargar Empleados
										</DropZone>
									</>
									:
									<>
										<div className="grid pb-8">
											<div className="h-14 bg-slate-200 rounded-xl animate-pulse duration-200"></div>
										</div>
										<div className="Employee-grid">
											<>
												<div className="Employees_skeleton duration-500"></div>
												<div className="Employees_skeleton duration-700"></div>
											</>
										</div>
									</>
							}
						</>
						<>
							{/* order | date */}
							<div className="input-list">
								<Input
									id="order"
									title="Orden de Compra"
									placeholder="📄 12-12052023"
									value={purchase.order}
									onChange={handleChange}
								/>

								<Input
									id="date"
									title="Fecha de recepción"
									type="date"
									value={purchase.date}
									onChange={handleChange}
								/>

								{/* <Select id="date" title="Filtrar por sub-tipo" defaultOption="-" options={[{ name: "", value: "" }]} /> */}
							</div>

							<Textarea
								id="details"
								value={purchase.details}
								title="Observaciones"
								className="pt-14"
								onChange={handleChange}
								placeholder="📝 ..."
								required={false}
							/>

							<div className="flex justify-end pt-8">
								<Button
									color="info"
									type="submit"
									className="font-bold !px-10 flex gap-4 items-center"
								>
									Siguiente <FaArrowRight className="mt-1" size={14} />
								</Button>
							</div>

						</>
					</Form>

				</main>
				<footer></footer>
			</div>

			<NotificationModal alertProps={[alert, handleAlert]} />
		</>
	)
}

export default SelectEmployees