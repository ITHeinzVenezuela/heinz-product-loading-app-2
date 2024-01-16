const { format, addDays } = require("date-fns");

const getJDEdwardsJulianDate = (date: string) => {
  
  const getYear = (date: string) => {
    const yearFormat = parseInt(date.split("-")[0])
    
    const year = parseInt(format(new Date(yearFormat, 0, 1), "yyyy"))
    const shortYear = format(new Date(yearFormat, 0, 1), "yy")
    
    const twenty_one_century = 2000

    const julianYear = (year >= twenty_one_century) ? `1${shortYear}` : `0${shortYear}`
    console.log("year", julianYear);
    
    return julianYear;
  }

  const getDayOfTheYear = (date: string) => {

    const ADDITIONAL_DAY = 1
    const ONE_DAY_MORE_DATE = addDays(new Date(date), ADDITIONAL_DAY);
    
    const day = format(ONE_DAY_MORE_DATE, "DDD")

    console.log("day", day);
    return day;
  }

  const year = getYear(date)
  const day = getDayOfTheYear(date)

  return parseInt(`${year}${day}`);
}

export default getJDEdwardsJulianDate;