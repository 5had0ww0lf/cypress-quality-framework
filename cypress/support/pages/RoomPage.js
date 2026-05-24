class RoomPage {

  setRoomNumber(roomNumber) {
    cy.get('#roomName').clear()
    cy.get('#roomName').type(roomNumber)
  }

  setRoomType(roomType){
    cy.get('#type')
      .select(roomType)    
  }

  setRoomTag(isAcessible){
    cy.get('#accessible')
      .select(isAcessible)    
  }

  setRoomPrice(roomPrice){
    cy.get('#roomPrice').clear()
    cy.get('#roomPrice').type(roomPrice)
  }

  checkAmenities(){
    cy.get('#wifiCheckbox').check()
    cy.get('#tvCheckbox').check()
  }

  createRoomButton(){
    cy.get('#createRoom').click()
  }
  
  createRoom(roomNumber, roomType, isAcessible, roomPrice){
    this.setRoomNumber(roomNumber)
    this.setRoomType(roomType)
    this.setRoomTag(isAcessible)
    this.setRoomPrice(roomPrice)
    this.checkAmenities()
    this.createRoomButton()
  }

  roomExists(roomNumber){
    return cy.get('h2')
  }

  roomExistsInTable(roomNumber) {
    return cy.get(`#roomName${roomNumber}`)
  }

  navigateToRoom(roomNumber){
    cy.get(`#roomName${roomNumber}`)
      .click()
    cy.contains('button', 'Edit')
      .click()
    cy.get('#roomPrice').should('not.have.value', '')
  }
  
  editRoom(roomNumber, roomPrice){
    this.setRoomNumber(roomNumber)
    this.setRoomPrice(roomPrice)
    this.updateRoomButton()
  }
  updateRoomButton(){
    cy.get('#update').click()
  }

  deleteRoom(roomNumber){
    //Find x button
    cy.get(`#roomName${roomNumber}`)
      .parent()
      .parent()
      .find('.roomDelete')
      .click()
  }

}

export default new RoomPage()