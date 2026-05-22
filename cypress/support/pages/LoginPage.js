class LoginPage {
    
  accessAdminPage(){
    cy.get('a.nav-link[href="/admin"]')
      .should('be.visible')
      .click()
  }

  loginButton(){
    cy.get('#doLogin').click()
  }

  login(username, password){
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    this.loginButton()
  }

  validateLogin(){
    return cy.get('#reportLink')    
  }

  logout(){
    cy.contains('button', 'Logout')
      .click()
    
  }

  errorMessage(){
    return cy.get('div.alert.alert-danger')
  }

}

export default new LoginPage()
