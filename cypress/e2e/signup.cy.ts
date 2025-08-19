describe('template spec', () => {
  it('passes', () => {
    //visit ibimina chatter signup page
    //create a new user
    //select topics of interest
    //click next to the next page

    cy.visit("https://ibimina-chatter.vercel.app/signup")
    cy.get('input[name="username"]').type("king")
    cy.get('input[name="email"]').type("kiT@gmail.com")
    cy.get('input[name="password"]').type("kingT1234567")
    cy.get('input[type="submit"]').click()
    //await for the next page to load
    cy.wait(2000)

    //check that the next page is topics route
    cy.url().should('include', '/add-topics')
    //select topics

    //click the button within the div that contains a p tag with JavaScript
    cy.get('p').contains('JavaScript').next('button').click()
    cy.get('p').contains('Vue').next('button').click()

   // add a topic in a input tag and click the button
    cy.get('input[name="topic"]').type("React")
    cy.get('input[type="submit"]').contains('Add topic').click()

   // click the next link
    cy.get('a').contains('Next').click()

    //check that the next page url includes /chatter after clicking the next link
    cy.url().should('include', '/chatter')
    //check that the nextpage contains a h1 tag with text Inkspire
    cy.get('h1').contains('InkSpire')

   // post a message
    cy.get('a').contains('write').click()
    cy.get('textarea[name="title"]').type("Testing app with cypress")
    cy.get('textarea[name="subtitle"]').type("Cypress testing is fun")
    cy.get('textarea[name="article"]').type("Hello world")

    cy.get('button').contains('Publish').click()

    //add a tag
   cy.get('input[name="tags"]').type("Test")
    cy.get('button[type="submit"]').contains('Add').click()
    cy.get('button').contains('Publish now').click()
   // check that the message is posted after two seconds
    cy.wait(7000)
    cy.url().should('include', '/article')
    cy.get('div').contains('Hello world')
    cy.get('a').contains('InkSpire').click()
    cy.url().should('include', '/chatter')

    // logout
    // click a li that contains an image with alt user
    // cy.get('li').contains('img', 'user').click()
    cy.get('li')
      .find('img[alt="user"]')
      .closest('li')
      .click();

      cy.wait(3000)
    // click the logout button
    cy.get('button').contains('Logout').click()
   // url should be the base url which is the login page
    cy.url().should('eq', 'https://ibimina-chatter.vercel.app/')


  })
})