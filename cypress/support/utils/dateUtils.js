const generateISODates = () => {
  const checkIn = new Date()
  const checkOut = new Date(checkIn)
  checkIn.setDate(checkIn.getDate() + 1)
  checkOut.setDate(checkIn.getDate() + 1)
  return {
    checkInISO: checkIn.toISOString().split('T')[0],
    checkOutISO: checkOut.toISOString().split('T')[0]
  }
}

export const generateRandomDates = () => {
  const { checkInISO, checkOutISO } = generateISODates()
  const [yearIn, monthIn, dayIn] = checkInISO.split('-')
  const [yearOut, monthOut, dayOut] = checkOutISO.split('-')
  return {
    checkIn: `${dayIn}/${monthIn}/${yearIn}`,
    checkOut: `${dayOut}/${monthOut}/${yearOut}`
  }
}

export const buildRoomUrl = (baseUrl) => {
  const { checkInISO, checkOutISO } = generateISODates()
  return `${baseUrl}?checkin=${checkInISO}&checkout=${checkOutISO}`
}