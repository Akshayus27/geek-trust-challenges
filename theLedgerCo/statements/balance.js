const formulateBalanceStatement = (BANK_NAME, BORROWER_NAME, EMI_NO, transactionsForEachMonth) => {
  return `${BANK_NAME} ${BORROWER_NAME} ${transactionsForEachMonth[EMI_NO].totalAmountPaid} ${transactionsForEachMonth[EMI_NO].remainingEmi}`;
};

module.exports = { formulateBalanceStatement };
