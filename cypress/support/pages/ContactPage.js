class ContactPage {

  messageForm(name, email, phone, subject, description){
    cy.get('#name').type(name)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#subject').type(subject)
    cy.get('#description').type(description)
  }

  sendMessageButton(){
    cy.get('#contact')
      .contains('button', 'Submit')
      .click()
  }

  validateMessage(){
    return cy.get('#contact').find('h3')
  }
}

export default new ContactPage()