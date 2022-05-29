const { EMI } = require('../constants');

const emiAmount = (transactionDetails, currentEmiNo, emiPayable) => {
  return transactionDetails.length >= EMI.MINIMUM_AVAILABLE_EMI &&
    transactionDetails[currentEmiNo - EMI.PREVIOUS_MONTH].balanceAmount < emiPayable
    ? transactionDetails[currentEmiNo - EMI.PREVIOUS_MONTH].balanceAmount
    : emiPayable;
};

const emiDetail = (currentEmiNo, emiPayable, totalEmi, transactionDetails, bankName, borrowerName) => {
  const isZerothMonth = transactionDetails.length === EMI.ZEROTH_MONTH;
  return {
    emiNo: isZerothMonth ? EMI.ZEROTH_MONTH : currentEmiNo,
    emiPayable: isZerothMonth ? EMI.MINIMUM_BALANCE : emiPayable,
    lumpSumPaid: EMI.MINIMUM_BALANCE,
    totalAmountPaid: isZerothMonth
      ? EMI.MINIMUM_BALANCE
      : transactionDetails[currentEmiNo - EMI.PREVIOUS_MONTH].totalAmountPaid + emiPayable,
    remainingEmi: isZerothMonth
      ? totalEmi
      : transactionDetails[currentEmiNo - EMI.PREVIOUS_MONTH].remainingEmi - EMI.PREVIOUS_MONTH,
    balanceAmount: isZerothMonth
      ? BANKS[bankName][borrowerName].totalAmountToPay
      : transactionDetails[currentEmiNo - EMI.PREVIOUS_MONTH].balanceAmount - emiPayable,
  };
};

module.exports = { emiAmount, emiDetail };
