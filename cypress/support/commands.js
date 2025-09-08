// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('convertDateUnix', (dateString, expectedUnixTimestamp) => {
    // Basic usage of a Cypress command demonstrating reusability.
    // In practice, `cy.command` would be reserved for more complex functionality.
    // This is a simple logger intended for CI/CD pipeline execution.
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Executing command: convertDateUnix with input: "${dateString}"`);
    cy.log(`Command: convertDateUnix | Input: ${dateString} | Time: ${timestamp}`);

    cy.request({
        url: `https://helloacm.com/api/unix-timestamp-converter/?cached&s=${dateString}`,
        method: 'GET',
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq(expectedUnixTimestamp);
    });
});