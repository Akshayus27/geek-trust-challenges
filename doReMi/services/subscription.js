const { subscribe, topUpPlan, subscribeCategory } = require('../helpers/subscription');
const { printReminders, errorMessage } = require('../utils/subscription');

const ValidationService = require('./validation');
module.exports = class SubscriptionService {
  constructor() {
    this.validationService = new ValidationService();
  }

  startSubscription = (startDate) => {
    try {
      this.validationService.validateDate(startDate);
    } catch (error) {
      return errorMessage(error);
    }

    subscribe(startDate);
  };

  addSubscription = (category, plan) => {
    try {
      this.validationService.validateCategory(category);
    } catch (error) {
      return errorMessage(error);
    }

    subscribeCategory(category, plan);
  };

  addTopUp = (type, months) => {
    try {
      this.validationService.canTopUp();
    } catch (error) {
      return errorMessage(error);
    }

    topUpPlan(type, months);
  };

  printRenewalDetails = () => {
    try {
      this.validationService.canPrintRenewalDetails();
    } catch (error) {
      return errorMessage(error);
    }

    return printReminders();
  };
};
