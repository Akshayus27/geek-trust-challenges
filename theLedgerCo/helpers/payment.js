const { EMI, ZEROTH_LOAN_PAYMENT, MONTHS } = require('../constants');
const { deducingEmisPaid, currentEmiPayable, availableLoanBalance } = require('../utils/payment');

const payLumpSum = (bankName, borrowerName, emiNo, lumpSumAmount) => {
  let transactionDetails = BANKS[bankName][borrowerName].transactionDetails;

  transactionDetails[emiNo].lumpSumPaid = lumpSumAmount;
  transactionDetails[emiNo].totalAmountPaid += lumpSumAmount;

  const remainingTotalAmountToPay =
    BANKS[bankName][borrowerName].totalAmountToPay - transactionDetails[emiNo].totalAmountPaid;
  transactionDetails[emiNo].balanceAmount = remainingTotalAmountToPay;

  BANKS[bankName][borrowerName].transactionDetails = transactionDetails;
};

const rescheduleFutureEmis = (bankName, borrowerName, emiNo) => {
  const totalEmi = BANKS[bankName][borrowerName].noOfYears * MONTHS;
  
  let transactionDetails = BANKS[bankName][borrowerName].transactionDetails;
  let remainingTotalAmountToPay = transactionDetails[emiNo].balanceAmount;

  for (let currentEmiNo = emiNo + 1; currentEmiNo <= totalEmi; currentEmiNo++) {
    transactionDetails[currentEmiNo].emiPayable = currentEmiPayable(transactionDetails, currentEmiNo);
    transactionDetails[currentEmiNo].balanceAmount = availableLoanBalance(transactionDetails, currentEmiNo);
    transactionDetails[currentEmiNo].totalAmountPaid = deducingEmisPaid(transactionDetails, currentEmiNo);
    remainingTotalAmountToPay -= transactionDetails[currentEmiNo].emiPayable;
  }

  BANKS[bankName][borrowerName].transactionDetails = transactionDetails;
};

const calculateRemainingEmis = (bankName, borrowerName, emiNo) => {
  let transactionDetails = BANKS[bankName][borrowerName].transactionDetails;

  transactionDetails = transactionDetails.filter((transaction, idx) => {
    if (idx === ZEROTH_LOAN_PAYMENT) return true;
    return transaction.emiPayable > EMI.MINIMUM_PAYABLE_EMI;
  });

  const currentTotalEmi = transactionDetails.length - EMI.PREVIOUS_MONTH;
  transactionDetails[emiNo].remainingEmi = currentTotalEmi - emiNo;

  for (let currentEmiNo = emiNo + 1; currentEmiNo <= currentTotalEmi; currentEmiNo++) {
    transactionDetails[currentEmiNo].remainingEmi =
      transactionDetails[currentEmiNo - EMI.PREVIOUS_MONTH].remainingEmi - EMI.PREVIOUS_MONTH;
  }

  BANKS[bankName][borrowerName].transactionDetails = transactionDetails;
};

module.exports = { payLumpSum, rescheduleFutureEmis, calculateRemainingEmis };
