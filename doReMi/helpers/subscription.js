const { TOP_UP_COST, PLAN_COST } = require('../constants');
const { reminderDate } = require('../utils/date');

const subscribe = (startDate) => {
  SUBSCRIPTION.startDate = startDate;
  SUBSCRIPTION.isStarted = true;
}

const subscribeCategory = (category, plan) => {
  SUBSCRIPTION[category] = { plan };
  SUBSCRIPTION[category] = { renewalReminder: reminderDate(plan) };

  SUBSCRIPTION.renewalAmount = SUBSCRIPTION.renewalAmount + PLAN_COST[category][plan];
};

const topUpPlan = (type, months) => {
  SUBSCRIPTION.isToppedUp = true;
  SUBSCRIPTION.renewalAmount += months * TOP_UP_COST[type];
};

module.exports = { subscribe, subscribeCategory, topUpPlan };
