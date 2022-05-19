global.SUBSCRIPTION = {
  renewalAmount: 0,
};

const { actions, error } = require('../constants');
const { topUpThePlan, subscribeToTheCategory } = require('../helpers/subscription');
const { formatDate } = require('../utils/date');
const {
  checkIfSubscribed,
  checkIfSubscriptionExists,
  outputErrorMessage,
  checkIfSubscriptionIsStarted,
  printSubscribedRenewalReminders,
} = require('../utils/subscription');

const processStatement = (input) => {
  const statement = input.split(' ');
  const action = statement[0];

  switch (action) {
    case actions.START_SUBSCRIPTION:
      return startSubscription(statement);
    case actions.ADD_SUBSCRIPTION:
      return addSubscription(statement);
    case actions.ADD_TOPUP:
      return addTopUp(statement);
    case actions.PRINT_RENEWAL_DETAILS:
      return printRenewalDetails();
  }
};

const startSubscription = (statement) => {
  const subscriptionStartDate = formatDate(statement[1]);

  if (subscriptionStartDate === error.type.invalid_date) return outputErrorMessage(null, error.message.invalid_date);

  SUBSCRIPTION.startDate = subscriptionStartDate;
};

const addSubscription = (statement) => {
  const categoryToSubscribe = statement[1];
  const plan = statement[2];

  if (!checkIfSubscriptionIsStarted())
    return outputErrorMessage(error.type.add_subscription_failed, error.message.invalid_date);

  if (checkIfSubscriptionExists(categoryToSubscribe))
    return outputErrorMessage(error.type.add_subscription_failed, error.message.duplicate_category);

  subscribeToTheCategory(categoryToSubscribe, plan);
};

const addTopUp = (statement) => {
  const topUpType = statement[1];
  const noOfMonthsToTopUp = +statement[2];

  if (!checkIfSubscriptionIsStarted())
    return outputErrorMessage(error.type.add_topup_failed, error.message.invalid_date);

  if (!checkIfSubscribed())
    return outputErrorMessage(error.type.add_topup_failed, error.message.subscription_not_found);

  if (SUBSCRIPTION.isToppedUp) return outputErrorMessage(error.type.add_topup_failed, error.message.duplicate_topup);

  topUpThePlan(topUpType, noOfMonthsToTopUp);
};

const printRenewalDetails = () => {
  if (!checkIfSubscribed()) return outputErrorMessage(null, error.message.subscription_not_found);

  return printSubscribedRenewalReminders();
};

module.exports = { processStatement };
