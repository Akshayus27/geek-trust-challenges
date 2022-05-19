const {
  calculateBalanceAmount,
  calculateEmiToBePaidForTheCurrentMonth,
  calculateTotalAmountPaid,
  reorderRemainingEmis,
} = require('../utils');

const formulateRemainingEMIAfterPayment = ({
  BANK_NAME,
  BORROWER_NAME,
  EMI_NO,
  LUMP_SUM_AMOUNT = 0,
  totalEmi,
  data,
}) => {
  let transactionsForEachMonth = data[BANK_NAME][BORROWER_NAME].transactionsForEachMonth;

  transactionsForEachMonth[EMI_NO].lumpSumPaid = LUMP_SUM_AMOUNT;
  transactionsForEachMonth[EMI_NO].totalAmountPaid += LUMP_SUM_AMOUNT;

  let remainingTotalAmountToPay =
    data[BANK_NAME][BORROWER_NAME].totalAmountToPay - transactionsForEachMonth[EMI_NO].totalAmountPaid;
  transactionsForEachMonth[EMI_NO].balanceAmount = remainingTotalAmountToPay;

  for (let emiNo = EMI_NO + 1; emiNo <= totalEmi; emiNo++) {
    transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth = calculateEmiToBePaidForTheCurrentMonth(
      transactionsForEachMonth,
      emiNo
    );
    transactionsForEachMonth[emiNo].balanceAmount = calculateBalanceAmount(transactionsForEachMonth, emiNo);
    transactionsForEachMonth[emiNo].totalAmountPaid = calculateTotalAmountPaid(transactionsForEachMonth, emiNo);
    remainingTotalAmountToPay -= transactionsForEachMonth[emiNo].emiToBePaidForTheCurrentMonth;
  }

  transactionsForEachMonth = reorderRemainingEmis(transactionsForEachMonth, EMI_NO);

  data[BANK_NAME][BORROWER_NAME].transactionsForEachMonth = transactionsForEachMonth;
};

module.exports = { formulateRemainingEMIAfterPayment };
