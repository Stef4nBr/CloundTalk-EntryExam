import { getCurrentDateTime, getCurrentUnixTimestamp, getCurrentDateTime12H } from "../support/utils/basicUtils"

/**
 * Ticket: ABC-1234
 * Author: SBrodziansky
 * Date: 2025-09-08
 * 
 * Description:
 * This test suite validates the UI functionality of the Unix Timestamp Converter web application.
 * 
 * Goals:
 *  - Verify conversion from valid datetime strings to Unix timestamps.
 *  - Verify conversion from valid Unix timestamps to datetime strings (12-hour format).
 *  - Ensure proper handling and messaging for invalid inputs.
 *  - Validate alert behavior when no input is provided.
 *  - Use API interception to confirm backend calls are made as expected.
 */


describe('Unix Timestamp Converter UI', { retries: 3 }, () => {

  const initVar = {
    dateString: getCurrentDateTime(),
    dateString12H: getCurrentDateTime12H(),
    unixTimestamp: getCurrentUnixTimestamp(),
    invalidDate: 'asdfasd'
  }

  beforeEach("", () => {
    cy.intercept('GET', 'https://helloacm.com/api/unix-timestamp-converter/?cached=&s=*').as('conversionAPI');

  })

  it('converts valid datetime string to Unix timestamp', () => {

    cy.visit('/')
    cy.get('#convertInput')
      .clear()
      .type(initVar.dateString)
    cy.get('#submitConvert').click()
    cy.wait('@conversionAPI')
    cy.get('#result')
      .next()
      .should('contain', initVar.unixTimestamp)
    cy.contains('.alert-success', 'Conversion successful!');
  })

  it('converts valid Unix timestamp to datetime string', () => {

    cy.visit('/')
    cy.get('#convertInput')
      .clear()
      .type(initVar.unixTimestamp)
    cy.get('#submitConvert').click()
    cy.wait('@conversionAPI')
    cy.get('#result')
      .next()
      .should('contain', initVar.dateString12H)
    cy.contains('.alert-success', 'Conversion successful!');
  })

  it('shows false for invalid input', () => {

    cy.visit('/')
    cy.get('#convertInput')
      .clear()
      .type(initVar.invalidDate)
    cy.get('#submitConvert').click()
    cy.wait('@conversionAPI')
    cy.contains('.alert', 'Invalid input format. Please enter a valid Unix timestamp or date string.');
  })

  it('shows alert message for none input', () => {

    cy.visit('/')
    cy.get('#convertInput')
      .clear()
    cy.get('#submitConvert').click()
    cy.contains('.alert', 'Please enter a value.');
    cy.get('@conversionAPI.all').should('have.length', 0)
  })


})
