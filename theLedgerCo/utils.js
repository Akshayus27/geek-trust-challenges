const { MINIMUM_BALANCE, INDEX_OF_ZEROTH_INITIAL_OF_LOAN_AMOUNT, MINIMUM_AVAILABLE_EMIS } = require('./constants');

const calculateBalanceAmount = (transactionsForEachMonth, emiNo) => {
  return transactionsForEachMonth[emiNo - 1].balanceAmount -
    transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth <
    MINIMUM_BALANCE
    ? transactionsForEachMonth[emiNo - 1].balanceAmount
    : transactionsForEachMonth[emiNo - 1].balanceAmount - transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth;
};

const calculateEmiToBePaidForTheCurrentMonth = (transactionsForEachMonth, emiNo) => {
  return transactionsForEachMonth[emiNo - 1].balanceAmount <
    transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth
    ? transactionsForEachMonth[emiNo - 1].balanceAmount
    : transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth;
};

const calculateTotalAmountPaid = (transactionsForEachMonth, emiNo) => {
  return transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth
    ? transactionsForEachMonth[emiNo - 1].totalAmountPaid +
        transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth
    : 0;
};

const reorderRemainingEmis = (transactionsForEachMonth, EMI_NO) => {
  transactionsForEachMonth = transactionsForEachMonth.filter((transaction, idx) => {
    if (idx === INDEX_OF_ZEROTH_INITIAL_OF_LOAN_AMOUNT) return true;
    return transaction.emiToBePaidForTheCurrentMonth > 0;
  });
  const currentTotalEmi = transactionsForEachMonth.length - 1;

  transactionsForEachMonth[EMI_NO].remainingEmi = currentTotalEmi - EMI_NO;

  for (let emiNo = EMI_NO + 1; emiNo <= currentTotalEmi; emiNo++) {
    transactionsForEachMonth[emiNo].remainingEmi = transactionsForEachMonth[emiNo - 1].remainingEmi - 1;
  }
  return transactionsForEachMonth;
};

const emiForTheCurrentMonth = (transactionsForEachMonth, emiNo, emiToBePaidForTheCurrentMonth) => {
  return transactionsForEachMonth.length >= MINIMUM_AVAILABLE_EMIS &&
    transactionsForEachMonth[emiNo - 1].balanceAmount < emiToBePaidForTheCurrentMonth
    ? transactionsForEachMonth[emiNo - 1].balanceAmount
    : emiToBePaidForTheCurrentMonth;
};

module.exports = {
  calculateBalanceAmount,
  calculateEmiToBePaidForTheCurrentMonth,
  calculateTotalAmountPaid,
  reorderRemainingEmis,
  emiForTheCurrentMonth,
};
