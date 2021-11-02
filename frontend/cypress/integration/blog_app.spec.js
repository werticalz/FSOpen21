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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.get('#username').type('rocketman')
      cy.get('#password').type('salaword')
      cy.get('#login-button').click()
    })
    it('Can add a blog', function () {
      cy.contains('Add a blog post').click()
      cy.get('#title').type('A new blog for testing')
      cy.get('#url').type('www.testworld.com')
      cy.get('#author').type('Is it me?')
      cy.get('#likes').type(0)
      cy.get('#submit_new_blog').click()
      cy.contains('Added blog A new blog for testing')

    })
  })
})