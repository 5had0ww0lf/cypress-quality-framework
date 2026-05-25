class BookingPage {

  checkAvailability(checkIn, checkOut){
    cy.get('.dateWrapper')
      .first()
      .find('input')
      .clear()
      .type(checkIn)
    cy.get('.dateWrapper')
      .last()
      .find('input')
      .clear()
      .type(checkOut)

    cy.contains('button', 'Check Availability').click()
  }

  selectRoom(){
    cy.get('a[href*="/reservation/2"]').click()
  }

  initiateReservation(){
    cy.get('#doReservation').click()
  }

  guestForm(firstName, lastName, email, phone){
    cy.get('input[name="firstname"]').type(firstName)
    cy.get('input[name="lastname"]').type(lastName)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="phone"]').type(phone)
  }
  
  finishReservationButton(){
    cy.contains('button', 'Reserve Now')
      .click()
  }

  validateBooking() {
    return cy.get('div.card-body > h2')
  }

}

export default new BookingPage()