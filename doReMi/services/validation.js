const ValidationError = require('../errors/validation');
const { error } = require('../constants');
const {
  isSubscriptionStarted,
  isAnyCategorySubscribed,
  isCategorySubscribed,
  isValidDate,
  isSubscriptionToppedUp,
} = require('../utils/subscription');

module.exports = class ValidationService {
  canTopUp() {
    const validationError = new ValidationError(error.type.add_topup_failed, '');

    if (!isSubscriptionStarted()) {
      validationError.message = error.message.invalid_date;
      throw validationError;
    }

    if (!isAnyCategorySubscribed()) {
      validationError.message = error.message.subscription_not_found;
      throw validationError;
    }

    if (isSubscriptionToppedUp()) {
      validationError.message = error.message.duplicate_topup;
      throw validationError;
    }
  }

  validateCategory(category) {
    const validationError = new ValidationError(error.type.add_subscription_failed, '');

    if (!isSubscriptionStarted()) {
      validationError.message = error.message.invalid_date;
      throw validationError;
    }

    if (isCategorySubscribed(category)) {
      validationError.message = error.message.duplicate_category;
      throw validationError;
    }
  }

  canPrintRenewalDetails() {
    if (!isAnyCategorySubscribed()) {
      throw new ValidationError(null, error.message.subscription_not_found);
    }
  }

  validateDate(startDate) {
    if (isValidDate(startDate)) {
      throw new ValidationError(null, error.message.invalid_date);
    }
  }
};
