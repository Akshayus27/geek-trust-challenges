const { EMI, MINIMUM_BALANCE } = require('../constants');

const availableLoanBalance = (transactionDetails, emiNo) => {
  return transactionDetails[emiNo - EMI.PREVIOUS_MONTH].balanceAmount - transactionDetails[emiNo].emiPayable <
    MINIMUM_BALANCE
    ? transactionDetails[emiNo - EMI.PREVIOUS_MONTH].balanceAmount
    : transactionDetails[emiNo - EMI.PREVIOUS_MONTH].balanceAmount - transactionDetails[emiNo].emiPayable;
};

const currentEmiPayable = (transactionDetails, emiNo) => {
  return transactionDetails[emiNo - EMI.PREVIOUS_MONTH].balanceAmount < transactionDetails[emiNo].emiPayable
    ? transactionDetails[emiNo - EMI.PREVIOUS_MONTH].balanceAmount
    : transactionDetails[emiNo].emiPayable;
};

const deducingEmisPaid = (transactionDetails, emiNo) => {
  return transactionDetails[emiNo].emiPayable
    ? transactionDetails[emiNo - EMI.PREVIOUS_MONTH].totalAmountPaid + transactionDetails[emiNo].emiPayable
    : 0;
};

module.exports = {
  availableLoanBalance,
  currentEmiPayable,
  deducingEmisPaid
};
