const { monthlyCostOfTopUp, costOfSubscriptionPlan } = require('../constants');
const { renewalReminderDate } = require('../utils/date');

const subscribeToTheCategory = (categoryToSubscribe, plan) => {
  SUBSCRIPTION[categoryToSubscribe] = { plan };
  SUBSCRIPTION[categoryToSubscribe] = { renewalReminder: renewalReminderDate(plan) };

  SUBSCRIPTION.renewalAmount = SUBSCRIPTION.renewalAmount + costOfSubscriptionPlan[categoryToSubscribe][plan];
};

const topUpThePlan = (topUpType, noOfMonthsToTopUp) => {
  SUBSCRIPTION.isToppedUp = true;
  SUBSCRIPTION.renewalAmount += noOfMonthsToTopUp * monthlyCostOfTopUp[topUpType];
};

module.exports = { subscribeToTheCategory, topUpThePlan };
