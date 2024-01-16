import readXlsxFile from 'read-excel-file'

export const isString = (string: unknown): boolean => {
  return typeof string === "string"
}

export const filterByNumbers = (value: string): number => { //"this27is65a34string" => 276534
  const array = value.split("")
  const onlyNumbersString = array.filter(char => !isNaN(parseInt(char))).join("")
  return parseInt(onlyNumbersString)
}

export const getJsonFromExcel = async (file: File) => {

  type TemplateEmployee = {
    ficha: number;
    name: string;
  }

  const map = {
    "Ficha": "ficha",
    "Nombre": "name",
  }

  const deleteDuplicates = (rows: TemplateEmployee[]) => {
    // Se transforman los objetos a string
    const stringObjectArray: string[] = rows.map(item => JSON.stringify(item));

    // Los duplicados de los strings que coincidan se eliminan y se deja un único duplicado
    const sortedArray = Array.from(new Set(stringObjectArray))

    // Se pasa de nuevo a JSON
    const employees = sortedArray.map(item => JSON.parse(item)) as TemplateEmployee[]
    return employees;
  }

  const output = await readXlsxFile<TemplateEmployee>(file, { map })

  // Se eliminan los duplicados
  const rows = deleteDuplicates(output.rows)

  return { ...output, rows };
}

export const stringListFrom = (array: string[]): string => {
  const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });
  return formatter.format(array)
}

export const getAvailableStock = (available: number, employees: number): number => {
  const availablePerUser = available / employees
  const integerStockValue = Math.floor(availablePerUser)

  const rest = availablePerUser - integerStockValue

  const rounds = [0, 0.25, 0.5, 0.75, 1]

  let extra = 0;
  rounds.forEach((value) => {
    extra = (rest >= value) ? value : extra
  })

  const stock = integerStockValue + extra;
  return stock;
}

export const getPurchaseOrders = (bills: Bill[], default_order_name: string) => {
  let orders = bills.map(item => item.purchase.order)
  orders.push(default_order_name)
  return orders;
}

export const getSKUList = (products: Product[]): string => {
  return [...new Set(products.map(product => product.sku))].sort().join(", ")
}