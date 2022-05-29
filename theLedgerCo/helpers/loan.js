const { MONTHS, EMI } = require('../constants');
const { emiDetail, emiAmount } = require('../utils/loan');

const scheduleEmis = ({ bankName, borrowerName, noOfYears }) => {
  const totalEmi = noOfYears * MONTHS;
  let emiPayable = Math.ceil(BANKS[bankName][borrowerName].totalAmountToPay / totalEmi);
 
  const transactionDetails = [];
  transactionDetails.push(
    emiDetail(EMI.ZEROTH_MONTH, EMI.MINIMUM_BALANCE, totalEmi, transactionDetails, bankName, borrowerName)
  );

  for (let emiNo = EMI.FIRST_MONTH; emiNo <= totalEmi; emiNo++) {
    emiPayable = emiAmount(transactionDetails, emiNo, emiPayable);
    transactionDetails.push(emiDetail(emiNo, emiPayable, totalEmi, transactionDetails, bankName, borrowerName));
  }
  
  BANKS[bankName][borrowerName].transactionDetails = transactionDetails;
};

const insertBorrowerProfile = ({ bankName, borrowerName, principal, noOfYears, rateOfInterest }) => {
  BANKS[bankName] = {
    ...BANKS[bankName],
    [borrowerName]: {
      principal,
      noOfYears,
      rateOfInterest,
    },
  };
};

const formulateTotalRepayableAmount = ({ bankName, borrowerName, principal, noOfYears, rateOfInterest }) => {
  BANKS[bankName][borrowerName].totalAmountToPay = Math.ceil(
    principal + (principal * noOfYears * rateOfInterest) / 100
  );
};

module.exports = { scheduleEmis, insertBorrowerProfile, formulateTotalRepayableAmount };
