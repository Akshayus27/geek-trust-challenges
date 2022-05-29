const { insertBorrowerProfile, formulateTotalRepayableAmount, scheduleEmis } = require('../helpers/loan');
const { payLumpSum, rescheduleFutureEmis, calculateRemainingEmis } = require('../helpers/payment');
const { deriveBalance } = require('../helpers/balance');

module.exports = class BankService {
  sanctionLoan = (bankName, borrowerName, principal, noOfYears, rateOfInterest) => {
    insertBorrowerProfile({ bankName, borrowerName, principal, noOfYears, rateOfInterest });

    formulateTotalRepayableAmount({ bankName, borrowerName, principal, noOfYears, rateOfInterest });

    scheduleEmis({ bankName, borrowerName, noOfYears });
  };

  processPayment = (bankName, borrowerName, lumpSumAmount, emiNo) => {
    payLumpSum(bankName, borrowerName, emiNo, lumpSumAmount);

    rescheduleFutureEmis(bankName, borrowerName, emiNo);

    calculateRemainingEmis(bankName, borrowerName, emiNo);
  };

  outstandingLoan = (bankName, borrowerName, emiNo) => {
    return deriveBalance(bankName, borrowerName, emiNo);
  };
};
