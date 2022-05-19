global.BANKS = {};

const { handleTransactionDetailsOfEmiPerMonth } = require('../statements/loan');
const { formulateRemainingEMIAfterPayment } = require('../statements/payment');
const { formulateBalanceStatement } = require('../statements/balance');
const { MONTHS } = require('../constants');

const processStatement = (input) => {
  const inputStatement = input.split(' ');
  let balance = null;

  switch (inputStatement[0]) {
    case 'LOAN':
      processLoanStatement(inputStatement, BANKS);
      break;
    case 'PAYMENT':
      processPaymentStatement(inputStatement, BANKS);
      break;
    case 'BALANCE':
      balance = processBalanceStatement(inputStatement, BANKS);
      break;
  }
  return balance;
};

const processLoanStatement = (statement, data) => {
  const BANK_NAME = statement[1];
  const BORROWER_NAME = statement[2];
  const PRINCIPAL = +statement[3];
  const NO_OF_YEARS = +statement[4];
  const RATE_OF_INTEREST = +statement[5];

  data[BANK_NAME] = {
    ...data[BANK_NAME],
    [BORROWER_NAME]: {
      principal: PRINCIPAL,
      noOfYears: NO_OF_YEARS,
      rateOfInterest: RATE_OF_INTEREST,
    },
  };
  data[BANK_NAME][BORROWER_NAME].totalAmountToPay = Math.ceil(
    PRINCIPAL + (PRINCIPAL * NO_OF_YEARS * RATE_OF_INTEREST) / 100
  );
  const totalEmi = NO_OF_YEARS * MONTHS;

  handleTransactionDetailsOfEmiPerMonth({ totalEmi, BANK_NAME, BORROWER_NAME, data });
  return;
};


const processPaymentStatement = (statement, data) => {
  const BANK_NAME = statement[1];
  const BORROWER_NAME = statement[2];
  const LUMP_SUM_AMOUNT = +statement[3];
  const EMI_NO = +statement[4];
  const totalEmi = data[BANK_NAME][BORROWER_NAME].noOfYears * MONTHS;

  formulateRemainingEMIAfterPayment({ BANK_NAME, BORROWER_NAME, EMI_NO, LUMP_SUM_AMOUNT, totalEmi, data });
  return;
};

const processBalanceStatement = (statement, data) => {
  const BANK_NAME = statement[1];
  const BORROWER_NAME = statement[2];
  const EMI_NO = +statement[3];

  return formulateBalanceStatement(
    BANK_NAME,
    BORROWER_NAME,
    EMI_NO,
    data[BANK_NAME][BORROWER_NAME].transactionsForEachMonth
  );
};

module.exports = { processStatement };
