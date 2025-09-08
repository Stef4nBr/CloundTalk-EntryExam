import { getCurrentDateTime, getCurrentUnixTimestamp, getCurrentDateTime12H } from "../../support/utils/basicUtils"

/**
 * Ticket: ABC-1234
 * Author: SBrodziansky
 * Date: 2025-09-08
 * 
 * Description:
 * This Cypress test verifies the functionality of the Unix Timestamp Converter API.
 * 
 * Goals:
 *  - Validate conversion from date string to Unix timestamp for various input cases.
 *  - Ensure the API returns correct error responses for invalid date strings.
 *  - Maintain test coverage for edge cases such as leap years and epoch boundaries.
 */

describe('Unix Timestamp Converter API', { retries: 3 }, () => {

  const initVar = {
    dateString: getCurrentDateTime(),
    dateString12H: getCurrentDateTime12H(),
    unixTimestamp: getCurrentUnixTimestamp(),
    invalidDate: 'asdfasd'
  }

  it('API should convert Date String to Unix Timestamp', () => {

    cy.convertDateUnix(initVar.dateString, initVar.unixTimestamp)
  });

  it('API should convert Unix Timestamp to Date String', () => {

    cy.convertDateUnix(initVar.unixTimestamp, initVar.dateString12H)
  });

  it('API should return false for invalid Date String', () => {

    cy.convertDateUnix(initVar.invalidDate, false)
    cy.convertDateUnix('123abc', false)
  });

  it('API should return false for edgecase Unix Timestamp', () => {

    cy.convertDateUnix(0, '1970-01-01 12:00:00')
    cy.convertDateUnix(-1, '1969-12-31 11:59:59')
    cy.convertDateUnix(32503680000, '3000-01-01 12:00:00')
    cy.convertDateUnix('0#$%^&*()', '1970-01-01 12:00:00')

  });

  it('API should return false for edgecase DateTime', () => {

    cy.convertDateUnix('0000-00-00%0000:00:00', -62169984000)
    cy.convertDateUnix('-0000-00-00', -62169984000)
  });

});
