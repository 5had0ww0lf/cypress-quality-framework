import RoomPage from '../../support/pages/RoomPage'
import { generateRoomNumber, generateUniqueRoomNumbers } from '../../support/utils/roomUtils';

describe('Room Management', () => {

  let roomData

  beforeEach(() => {
    cy.fixture('room').then((data) => {
      roomData = data
    })
    cy.visit('/')
    cy.accessAdminPage()
    cy.login('admin', 'password')
  });

  it('should create a new room successfully', () => {
    const number = generateRoomNumber()
    const {type, accessibleTag, price } = roomData.newRoom
    RoomPage.createRoom(number, type, accessibleTag, price)
    RoomPage.roomExistsInTable(number)
      .should('be.visible')
      .and('have.text', `${number}`)
  });

  it('should edit an existing room successfully', () => {
    //Precondition
    const { number, newNumber } = generateUniqueRoomNumbers()
    const {type, accessibleTag, price } = roomData.existingRoom
    RoomPage.createRoom(number, type, accessibleTag, price)
      
    const { newPrice } = roomData.updatedRoom
    RoomPage.navigateToRoom(number)
    RoomPage.editRoom(newNumber, newPrice)
    RoomPage.roomExists(newNumber)
      .should('be.visible')
      .and('contain', newNumber)
  })

  it('should show error when creating a room with empty required fields', () => {
    RoomPage.createRoomButton()
    cy.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Failed')
  });

  it('should show error when updating a room with invalid field formats', () => {
    //Precondition
    const number = generateRoomNumber()
    const {type, accessibleTag, price } = roomData.existingRoom
    RoomPage.createRoom(number, type, accessibleTag, price)

    const { invalidNumber, invalidPrice } = roomData.invalidRoomFormat
    RoomPage.navigateToRoom(number)
    RoomPage.editRoom(invalidNumber, invalidPrice)
    cy.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Failed')

  })

  it('should delete a room and verify it no longer appears in the list', () => {
    //Precondition
    const number = generateRoomNumber()
    const { type, accessibleTag, price } = roomData.existingRoom
    RoomPage.createRoom(number, type, accessibleTag, price)
    RoomPage.roomExistsInTable(number)
      .should('be.visible')
      .and('have.text', `${number}`)
      
    RoomPage.deleteRoom(number)
    RoomPage.roomExistsInTable(number)
      .should('not.exist')
 
    
  });

})