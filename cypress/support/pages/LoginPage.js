class LoginPage {

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

}

export default new LoginPage()
