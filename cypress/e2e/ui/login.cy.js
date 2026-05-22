import LoginPage from '../../support/pages/LoginPage';

describe('Admin Login Tests', () => {

  let credentials

  beforeEach(() => {
    cy.fixture('login').then((data) => {
      credentials = data
    })
    cy.visit('/')
    LoginPage.accessAdminPage()
  });

  it('should login successfully with valid credentials', () =>{
    const { username, password } = credentials.validCredentials
    cy.login(username, password)
    LoginPage.validateLogin()
      .should('be.visible')
    LoginPage.logout()
    LoginPage.validateLogin()
      .should('not.exist')
  })

  it('should show error when correct username and wrong password are provided', () =>{
    const { username, password } = credentials.invalidPassword
    cy.login(username, password)

    LoginPage.errorMessage()
      .should('be.visible')
      .and('contain', 'Invalid')
  })
  
  it('should show error when wrong username and correct password are provided', () =>{
    const { username, password } = credentials.invalidUsername
    cy.login(username, password)

    LoginPage.errorMessage()
      .should('be.visible')
      .and('contain', 'Invalid')  
  })
  
  it('should show error when username and password are empty', () =>{
    LoginPage.loginButton()

    LoginPage.errorMessage()
      .should('be.visible')
      .and('contain', 'Invalid')     
  })  

})