describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.cyu.fr/')
    console.log("cy.location()dd", cy.location("toString"))
  })
})