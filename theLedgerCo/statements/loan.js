const { emiForTheCurrentMonth } = require('../utils');

const handleTransactionDetailsOfEmiPerMonth = ({ totalEmi, BANK_NAME, BORROWER_NAME, data }) => {
  let emiToBePaidForTheCurrentMonth = Math.ceil(data[BANK_NAME][BORROWER_NAME].totalAmountToPay / totalEmi);
  const transactionsForEachMonth = [
    {
      emiNo: 0,
      emiToBePaidForTheCurrentMonth: 0,
      lumpSumPaid: 0,
      totalAmountPaid: 0,
      remainingEmi: totalEmi,
      balanceAmount: data[BANK_NAME][BORROWER_NAME].totalAmountToPay,
    },
  ];

  for (let emiNo = 1; emiNo <= totalEmi; emiNo++) {
    emiToBePaidForTheCurrentMonth = emiForTheCurrentMonth(transactionsForEachMonth, emiNo, emiToBePaidForTheCurrentMonth);

    transactionsForEachMonth.push({
      emiNo,
      emiToBePaidForTheCurrentMonth,
      lumpSumPaid: 0,
      totalAmountPaid: transactionsForEachMonth[emiNo - 1].totalAmountPaid + emiToBePaidForTheCurrentMonth,
      remainingEmi: transactionsForEachMonth[emiNo - 1].remainingEmi - 1,
      balanceAmount: transactionsForEachMonth[emiNo - 1].balanceAmount - emiToBePaidForTheCurrentMonth,
    });
  }
  data[BANK_NAME][BORROWER_NAME].transactionsForEachMonth = transactionsForEachMonth;

  return;
};

module.exports = { handleTransactionDetailsOfEmiPerMonth };
