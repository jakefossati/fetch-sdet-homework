import '@testing-library/cypress/add-commands'

Cypress.Commands.add('enterNumberLeftGrid', (numberToAdd, index) => {
    cy.get('#left_'+index).type(numberToAdd);
})

Cypress.Commands.add('enterNumberRightGrid', (numberToAdd, index) => {
    cy.get('#right_'+index).type(numberToAdd);
})

Cypress.Commands.add('getWeighings', () => {
    return cy.get('.game-info', { timeout: 6000 });
})

Cypress.Commands.add('clickWeighButton', () => {
    cy.get('#weigh').click();
})

Cypress.Commands.add('clickResetButton', () => {
    //cy.get('#reset').click();
    cy.findByText("Reset").click();
})

Cypress.Commands.add('clickCoinButton', (coinNumber) => {
    cy.get("#coin_" + coinNumber).click();
})

Cypress.Commands.add('checkGridNumber', (grid, number) => {
    cy.get("#" + grid + "_" + number).invoke("attr", "value").should("contain", number)
})