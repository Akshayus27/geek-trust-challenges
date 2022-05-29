global.SUBSCRIPTION = {
  renewalAmount: 0,
};
const { ACTION, STATEMENT } = require('../constants');
const { formatDate } = require('../utils/date');
const { formatInput } = require('../utils/subscription');

const SubscriptionService = require('./subscription');

module.exports = class StatementService {
  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  extractStatement = (action, statement) => {
    switch (action) {
      case ACTION.START_SUBSCRIPTION:
        return { startDate: formatDate(statement[STATEMENT.DATE_INDEX]) };
      case ACTION.ADD_SUBSCRIPTION:
        return { category: statement[STATEMENT.CATEGORY_INDEX], plan: statement[STATEMENT.PLAN_INDEX] };
      case ACTION.ADD_TOPUP:
        return { type: statement[STATEMENT.TYPE_INDEX], months: +statement[STATEMENT.MONTH_INDEX] };
      default:
        return {};
    }
  };

  processStatement = (input) => {
    const { action, statement } = formatInput(input);
    const {
      startDate = null,
      category = null,
      plan = null,
      type = null,
      months = null,
    } = this.extractStatement(action, statement);

    switch (action) {
      case ACTION.START_SUBSCRIPTION:
        return this.subscriptionService.startSubscription(startDate);
      case ACTION.ADD_SUBSCRIPTION:
        return this.subscriptionService.addSubscription(category, plan);
      case ACTION.ADD_TOPUP:
        return this.subscriptionService.addTopUp(type, months);
      case ACTION.PRINT_RENEWAL_DETAILS:
        return this.subscriptionService.printRenewalDetails();
    }
  };
};
