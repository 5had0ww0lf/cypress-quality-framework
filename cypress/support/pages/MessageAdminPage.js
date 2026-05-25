class MessageAdminPage {

  accessMessagePage(){
    cy.get('a[href="/admin/message"]').click()
  }

  searchMessage(subject){
    return cy.contains('[data-testid^="messageDescription"]', subject)
  }

}

export default new MessageAdminPage()