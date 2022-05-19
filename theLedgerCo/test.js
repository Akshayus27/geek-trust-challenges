const { expect } = require('chai');
const { processStatement } = require('./services/bank');

describe('processStatement', () => {
  it('should return the balance of the emi remaining', () => {
    const input = [
      'LOAN IDIDI Dale 10000 5 4',
      'LOAN MBI Harry 2000 2 2',
      'BALANCE IDIDI Dale 5',
      'BALANCE IDIDI Dale 40',
      'BALANCE MBI Harry 12',
      'BALANCE MBI Harry 0',
    ];

    const output = [];
    for (let i = 0; i < input.length; i++) {
      const result = processStatement(input[i]);
      if (result) output.push(result);
    }

    const expectedOutput = ['IDIDI Dale 1000 55', 'IDIDI Dale 8000 20', 'MBI Harry 1044 12', 'MBI Harry 0 24'];

    expect(output[0]).to.be.equal(expectedOutput[0]);
    expect(output[1]).to.be.equal(expectedOutput[1]);
    expect(output[2]).to.be.equal(expectedOutput[2]);
    expect(output[3]).to.be.equal(expectedOutput[3]);
  });

  it('should return the correct balance of the emi remaining after lump payment', () => {
    const input = [
      'LOAN IDIDI Dale 5000 1 6',
      'LOAN MBI Harry 10000 3 7',
      'LOAN UON Shelly 15000 2 9',
      'PAYMENT IDIDI Dale 1000 5',
      'PAYMENT MBI Harry 5000 10',
      'PAYMENT UON Shelly 7000 12',
      'BALANCE IDIDI Dale 3',
      'BALANCE IDIDI Dale 6',
      'BALANCE UON Shelly 12',
      'BALANCE MBI Harry 12',
    ];

    const output = [];
    for (let i = 0; i < input.length; i++) {
      const result = processStatement(input[i]);
      if (result) output.push(result);
    }

    const expectedOutput = ['IDIDI Dale 1326 9', 'IDIDI Dale 3652 4', 'UON Shelly 15856 3', 'MBI Harry 9044 10'];

    expect(output[0]).to.be.equal(expectedOutput[0]);
    expect(output[1]).to.be.equal(expectedOutput[1]);
    expect(output[2]).to.be.equal(expectedOutput[2]);
    expect(output[3]).to.be.equal(expectedOutput[3]);
  });
});
