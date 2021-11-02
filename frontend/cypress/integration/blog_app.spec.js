describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test man',
      username: 'rocketman',
      password: 'salaword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
      .click()
    cy.contains('Username:')
    cy.contains('Password:')
  })
  describe('Login', function () {
    it('works with right credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('rocketman')
      cy.get('#password').type('salaword')
      cy.get('#login-button').click()
      cy.contains('Logged in as Test man')
    })
    it('does not work with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('rocketwoman')
      cy.get('#password').type('salaword')
      cy.get('#login-button').click()
      cy.contains('Wrong username & password combination')
    })
  })
})