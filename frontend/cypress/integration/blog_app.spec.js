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
      cy.contains('Add a blog post').click()
      cy.get('#title').type('A new blog for testing')
      cy.get('#url').type('www.testworld.com')
      cy.get('#author').type('Is it me?')
      cy.get('#likes').type(0)
      cy.get('#submit_new_blog').click()
    })
    it('Can add a blog', function () {
      cy.contains('Added blog A new blog for testing')
    })
    it('Can like a blog', function () {
      cy.get('#view_hide_button').click()
      cy.get('#like_button').click()
      cy.contains('Added a like to A new blog for testing')
      cy.contains('1 like')
    })
    it('Can delete a blog they added', function () {
      cy.get('#view_hide_button').click()
      cy.get('#delete_button').click()
      cy.contains('Succesfully removed')
    })
  })
  describe('Arrangement:', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.get('#username').type('rocketman')
      cy.get('#password').type('salaword')
      cy.get('#login-button').click()
      cy.contains('Add a blog post').click()
      cy.get('#title').type('A new blog for testing')
      cy.get('#url').type('www.testworld.com')
      cy.get('#author').type('Is it me?')
      cy.get('#likes').type(0)
      cy.get('#submit_new_blog').click()
      cy.get('#title').type('Another blog for testing likes')
      cy.get('#url').type('www.testworld.com')
      cy.get('#author').type('Is it me?')
      cy.get('#likes').type(1)
      cy.get('#submit_new_blog').click()
      cy.wait(800)
      cy.get('.blogs').find('#blog_title').first().as('firstBlog')
    })
    it('Blogposts are initially arranged in right order', function () {
      cy.get(this.firstBlog).contains('Another blog')
    })
    it.only('Adding likes modifies the order', function () {
      cy.contains('A new blog').find('#view_hide_button').click().then(() => {
        cy.get('#like_button').click()
      }).then(() => {
        cy.wait(1500)
        cy.get('.blogs').find('#blog_title').first().as('updatedFirstBlog').then(() => {
          cy.get(this.updatedFirstBlog).contains('A new blog')
        })
      })

    })
  })
})