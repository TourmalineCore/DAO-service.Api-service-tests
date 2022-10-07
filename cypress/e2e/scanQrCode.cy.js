describe('Test User Login', () => {

  it('My test', () => {
    cy.intercept('/walletConnectSessions').as('sessionDelivery')

    cy.visit('http://localhost:3000');

    cy.contains('Connect')
      .click();

    cy.get('.walletconnect-modal__base')
      .screenshot('qrcode'); 

    cy.wait('@sessionDelivery', { timeout: 30 * 1000});
  });
});