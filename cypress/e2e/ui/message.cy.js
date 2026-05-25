import MessageAdminPage from '../../support/pages/MessageAdminPage'
import ContactPage from '../../support/pages/ContactPage';

describe('Send Us a Message', () => {

  let messageData

  beforeEach(() => {
    cy.fixture('message').then((data) => {
      messageData = data
    })
    cy.visit('/')
  });

  it('should send a message successfully', () => {
    const {name, email, phone, subject, description} = messageData.validMessage
    ContactPage.messageForm(name, email, phone, subject, description)
    ContactPage.sendMessageButton()
    ContactPage.validateMessage()
      .should('contain', name)

    //Admin side
    cy.accessAdminPage()
    cy.login('admin', 'password')

    MessageAdminPage.accessMessagePage()
    MessageAdminPage.searchMessage(subject)
      .should('be.visible')
  });

  it('should show error when required fields are empty', () => {
    ContactPage.sendMessageButton()
    cy.getErrorMessage()
      .should('be.visible')
  });

  it('should show error when fields contain invalid formats', () => {
    const {name, email, phone, subject, description} = messageData.invalidMessage
    ContactPage.messageForm(name, email, phone, subject, description)
    ContactPage.sendMessageButton()
    cy.getErrorMessage()
      .should('be.visible')    
  });

})