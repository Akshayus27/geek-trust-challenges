const { category } = require('../constants');

const checkIfSubscribed = () => {
  return SUBSCRIPTION[category.MUSIC] || SUBSCRIPTION[category.VIDEO] || SUBSCRIPTION[category.PODCAST] || false;
};

const checkIfSubscriptionExists = (categoryToSubscribe) => {
  return SUBSCRIPTION[categoryToSubscribe] || false;
};

const checkIfSubscriptionIsStarted = () => {
  return SUBSCRIPTION.startDate || false;
};

const printSubscribedRenewalReminders = () => {
  const renewalDetails = [];

  for (const currentCategory of Object.keys(category)) {
    if (checkIfSubscriptionExists(currentCategory)) {
      renewalDetails.push(`RENEWAL_REMINDER ${currentCategory} ${SUBSCRIPTION[currentCategory].renewalReminder}`);
    }
  }
  renewalDetails.push(`RENEWAL_AMOUNT ${SUBSCRIPTION.renewalAmount}`);

  return renewalDetails;
};

const outputErrorMessage = (type, message) => {
  return type ? `${type} ${message}` : message;
};

module.exports = {
  checkIfSubscribed,
  checkIfSubscriptionExists,
  checkIfSubscriptionIsStarted,
  printSubscribedRenewalReminders,
  outputErrorMessage,
};
