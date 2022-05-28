const { expect } = require('chai');
const StatementService = require('./services/statement');

describe('Subscription', () => {
  it('should print the current error and details', () => {
    const statementService = new StatementService();

    const inputLines = [
      'START_SUBSCRIPTION 25-07-2021',
      'ADD_SUBSCRIPTION MUSIC PREMIUM',
      'ADD_SUBSCRIPTION VIDEO PREMIUM',
      'ADD_SUBSCRIPTION PODCAST PERSONAL',
      'PRINT_RENEWAL_DETAILS',
    ];
    const expectedOutput = [
      'RENEWAL_REMINDER MUSIC 15-10-2021',
      'RENEWAL_REMINDER VIDEO 15-10-2021',
      'RENEWAL_REMINDER PODCAST 15-08-2021',
      'RENEWAL_AMOUNT 850',
    ];

    let actualOutput = [];
    for (let i = 0; i < inputLines.length; i++) {
      const result = statementService.processStatement(inputLines[i]);
      if (result) actualOutput.push(...(result instanceof Array ? result : [result]));
    }

    expect(actualOutput).to.deep.equal(expectedOutput);
  });
});
