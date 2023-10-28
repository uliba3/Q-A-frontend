describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const usera = {
      name: 'a',
      username: 'a',
      password: 'a'
    }
    const userb = {
      name: 'b',
      username: 'b',
      password: 'b'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', usera)
    cy.request('POST', 'http://localhost:3003/api/users/', userb)
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', function() {
    cy.contains('Blogs')
  })
  it('login form can be opened', function() {
    cy.contains('log in').click()
  })
  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('a')
    cy.get('#password').type('a')
    cy.get('#login-button').click()
    cy.contains('a logged in')
  })
  it('user can fail login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('a')
    cy.get('#password').type('b')
    cy.get('#login-button').click()
    cy.contains('wrong username or password')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('a')
      cy.get('#password').type('a')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('aaa')
      cy.get('#author').type('a')
      cy.get('#URL').type('url')
      cy.get('#submit-button').click()
      cy.contains('aaa by a added!!')
    })
  })
  describe('and a blog exists', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('a')
      cy.get('#password').type('a')
      cy.get('#login-button').click()
      cy.contains('new Blog').click()
      cy.get('#title').type('most likes')
      cy.get('#author').type('a')
      cy.get('#URL').type('url')
      cy.get('#submit-button').click()
    })

    it('it can expand view', function () {
      cy.contains('view').click()
      cy.contains('hide')
    })
    it('it can add like', function () {
      cy.contains('view').click()
      cy.get('#addLike').click()
      cy.contains('1')
    })
    it('it can be closed', function () {
      cy.contains('view').click()
      cy.contains('hide').click()
      cy.contains('view')
    })
    it('it can be deleted', function () {
      cy.contains('delete').click()
      cy.contains('delete').should('not.exist')
    })
    it('user can logout', function () {
      cy.contains('logout').click()
      cy.contains('login')
    })
    it('other user cannot delete', function () {
      cy.contains('logout').click()
      cy.contains('log in').click()
      cy.get('#username').type('b')
      cy.get('#password').type('b')
      cy.get('#login-button').click()
      cy.contains('view')
      cy.get('#delete-button').should('have.css', 'display', 'none')
    })
    it('likes are ordered', function () {
      cy.contains('new Blog').click()
      cy.get('#title').type('second likes')
      cy.get('#author').type('a')
      cy.get('#URL').type('url')
      cy.get('#submit-button').click()
      cy.wait(1000)
      cy.get('#view-button').eq(0).click()
      cy.get('#addLike').eq(0).click()
      cy.get(':nth-child(5) > :nth-child(1) > #view-button').click()
      cy.get(':nth-child(5) > [style=""] > #addLike').click()
      cy.wait(1000)
      cy.get(':nth-child(5) > [style=""] > #addLike').click()
      cy.wait(1000)
      cy.reload()
      cy.get('#view-button').eq(0).click()
      cy.get(':nth-child(5) > :nth-child(1) > #view-button').click()
      cy.get(':nth-child(4) > [style=""]').contains(2)
      cy.get(':nth-child(5) > [style=""]').contains(1)
    })
  })
})