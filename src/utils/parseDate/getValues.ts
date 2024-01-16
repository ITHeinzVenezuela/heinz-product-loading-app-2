import { startOfDay, addHours, addMinutes } from "date-fns"

export const getToday = () => {
  return new Date()
}

export const getTodayUTC = () => {
  return getToday().toISOString()
  // "2022-01-01T00:00:00.000Z"
}

export const getStartOfDay = (date: string) => {
  // (date: string)
  debugger
  
  if (date) {
    const splitDate = date.split("-")

    const formatDate = {
      year: parseInt(splitDate[0]),
      month: (parseInt(splitDate[1]) - 1),
      day: parseInt(splitDate[2]),
    }

    const { year, month, day } = formatDate

    return startOfDay(new Date(year, month, day)).toISOString()
  }

  return startOfDay(new Date()).toISOString()
  // It turns into: '2020-10-14T19:29:31Z'
}

export const getDateFrom = (dateString: string, time: string) => {
  // (date: string | undefined | "" , time: string | undefined): Date

  let format = new Date();
  
  //Cuando no se ingresa fecha se establece la fecha de ese momento
  const date = new Date(getStartOfDay(dateString))
  
  if(time){ // "15:12" => ["15", "12"]
    const splitTime = time.split(":");
    format = addHours(date, parseInt(splitTime[0]))
    format = addMinutes(format, parseInt(splitTime[1]))
  }else{
    //Cuando no se ingresa tiempo se regresa la fecha con la hora 00:00 en UTC dependiendo de la ubicación
    format = date;
  }

  return format;
}