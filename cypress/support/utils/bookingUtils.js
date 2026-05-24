export const generateRandomDates = () => {
  const checkIn = new Date()
  const checkOut = new Date(checkIn)
  
  checkIn.setDate(checkIn.getDate() + 1) // tomorrow
  const checkInISO = checkIn.toISOString().split('T')[0]
  const [yearIn, monthIn, dayIn] = checkInISO.split('-')
  const checkInDate = `${dayIn}/${monthIn}/${yearIn}`

  checkOut.setDate(checkIn.getDate() + 1) // day after check-in
  const checkOutISO = checkOut.toISOString().split('T')[0]
  const [yearOut, monthOut, dayOut] = checkOutISO.split('-')
  const checkOutDate = `${dayOut}/${monthOut}/${yearOut}`

  return { checkIn: checkInDate, checkOut: checkOutDate }
}