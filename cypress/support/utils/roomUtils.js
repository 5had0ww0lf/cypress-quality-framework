export const generateRoomNumber = () => {
  const min = 104
  const max = 200
  const roomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return roomNumber.toString()
}

export const generateUniqueRoomNumbers = () => {
  const number = generateRoomNumber()
  let newNumber
  do {
    newNumber = generateRoomNumber()
  } while (newNumber === number)
  return { number, newNumber }
}