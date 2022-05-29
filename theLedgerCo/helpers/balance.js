const deriveBalance = (bankName, borrowerName, emiNo) => {
  const transactionDetails = BANKS[bankName][borrowerName].transactionDetails;
  const totalAmountPaid = transactionDetails[emiNo].totalAmountPaid;
  const remainingEmi = transactionDetails[emiNo].remainingEmi;

  return `${bankName} ${borrowerName} ${totalAmountPaid} ${remainingEmi}`;
};

module.exports = { deriveBalance };
