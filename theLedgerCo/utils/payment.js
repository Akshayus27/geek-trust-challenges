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

// const schedulingFutureEmis = (transactionDetails, EMI_NO) => {
//   transactionDetails = transactionDetails.filter((transaction, idx) => {
//     if (idx === ZEROTH_LOAN_PAYMENT) return true;
//     return transaction.emiPayable > 0;
//   });
//   const currentTotalEmi = transactionDetails.length - 1;

//   transactionDetails[EMI_NO].remainingEmi = currentTotalEmi - EMI_NO;

//   for (let emiNo = EMI_NO + 1; emiNo <= currentTotalEmi; emiNo++) {
//     transactionDetails[emiNo].remainingEmi = transactionDetails[emiNo - EMI.PREVIOUS_MONTH].remainingEmi - 1;
//   }

//   BANKS[BANK_NAME][BORROWER_NAME].transactionDetails = transactionDetails;
//   return transactionDetails;
// };

module.exports = {
  availableLoanBalance,
  currentEmiPayable,
  deducingEmisPaid
};
