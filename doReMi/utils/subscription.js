const { CATEGORY, error, STATEMENT, NOT_SUBSCRIBED } = require('../constants');

const isAnyCategorySubscribed = () => {
  return (
    SUBSCRIPTION[CATEGORY.MUSIC] || SUBSCRIPTION[CATEGORY.VIDEO] || SUBSCRIPTION[CATEGORY.PODCAST] || NOT_SUBSCRIBED
  );
};

const isCategorySubscribed = (categoryToSubscribe) => {
  return SUBSCRIPTION[categoryToSubscribe] || NOT_SUBSCRIBED;
};

const isSubscriptionStarted = () => {
  return SUBSCRIPTION.isStarted || NOT_SUBSCRIBED;
};

const isSubscriptionToppedUp = () => {
  return SUBSCRIPTION.isToppedUp || NOT_SUBSCRIBED;
};

const printReminders = () => {
  const renewalDetails = [];

  for (const currentCategory of Object.keys(CATEGORY)) {
    if (isCategorySubscribed(currentCategory)) {
      renewalDetails.push(`RENEWAL_REMINDER ${currentCategory} ${SUBSCRIPTION[currentCategory].renewalReminder}`);
    }
  }
  renewalDetails.push(`RENEWAL_AMOUNT ${SUBSCRIPTION.renewalAmount}`);

  return renewalDetails;
};

const isValidDate = (startDate) => {
  return startDate === error.type.invalid_date;
};

const errorMessage = (error) => {
  return error.type ? `${error.type} ${error.message}` : error.message;
};

const formatInput = (input) => {
  const statement = input.split(' ');
  const action = statement[STATEMENT.ACTION_INDEX];

  return { action, statement };
};

module.exports = {
  isAnyCategorySubscribed,
  isCategorySubscribed,
  isSubscriptionStarted,
  isSubscriptionToppedUp,
  isValidDate,
  printReminders,
  errorMessage,
  formatInput,
};
