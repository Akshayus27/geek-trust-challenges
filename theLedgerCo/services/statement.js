global.BANKS = {};

const { ACTION, STATEMENT } = require('../constants');
const { extractInputStatement } = require('../utils/statement');

const BankService = require('./bank');

module.exports = class StatementService {
  constructor() {
    this.bankService = new BankService();
  }

  extractStatement = (action, statement) => {
    switch (action) {
      case ACTION.LOAN:
        return {
          bankName: statement[STATEMENT.BANK_NAME_INDEX],
          borrowerName: statement[STATEMENT.BORROWER_NAME_INDEX],
          principal: +statement[STATEMENT.PRINCIPAL_INDEX],
          noOfYears: +statement[STATEMENT.NO_OF_YEARS_INDEX],
          rateOfInterest: +statement[STATEMENT.RATE_OF_INTEREST_INDEX],
        };
      case ACTION.PAYMENT:
        return {
          bankName: statement[STATEMENT.BANK_NAME_INDEX],
          borrowerName: statement[STATEMENT.BORROWER_NAME_INDEX],
          lumpSumAmount: +statement[STATEMENT.LUMP_SUM_AMOUNT_INDEX],
          emiNo: +statement[STATEMENT.EMI_NO_INDEX.PAYMENT],
        };
      case ACTION.BALANCE:
        return {
          bankName: statement[STATEMENT.BANK_NAME_INDEX],
          borrowerName: statement[STATEMENT.BORROWER_NAME_INDEX],
          emiNo: +statement[STATEMENT.EMI_NO_INDEX.BALANCE],
        };
    }
  };

  processStatement = (input) => {
    const { action, statement } = extractInputStatement(input);
    const {
      bankName = '',
      borrowerName = '',
      principal = 0,
      noOfYears = 0,
      rateOfInterest = 0,
      lumpSumAmount = 0,
      emiNo = 0,
    } = this.extractStatement(action, statement);
    // console.log(
    //   `🚀 ~ file: statement.js ~ line 43 ~ StatementService ~ bankName = '',
    //   borrowerName = '',
    //   principal = 0,
    //   noOfYears = 0,
    //   rateOfInterest = 0,
    //   lumpSumAmount = 0,
    //   emiNo `,
    //   bankName,
    //   borrowerName,
    //   principal,
    //   noOfYears,
    //   rateOfInterest,
    //   lumpSumAmount,
    //   emiNo
    // );

    switch (action) {
      case ACTION.LOAN:
        this.bankService.sanctionLoan(bankName, borrowerName, principal, noOfYears, rateOfInterest);
        break;
      case ACTION.PAYMENT:
        this.bankService.processPayment(bankName, borrowerName, lumpSumAmount, emiNo);
        break;
      case ACTION.BALANCE:
        return this.bankService.outstandingLoan(bankName, borrowerName, emiNo);
    }
  };
};
