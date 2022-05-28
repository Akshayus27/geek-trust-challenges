const ACTION = {
  START_SUBSCRIPTION: 'START_SUBSCRIPTION',
  ADD_TOPUP: 'ADD_TOPUP',
  ADD_SUBSCRIPTION: 'ADD_SUBSCRIPTION',
  PRINT_RENEWAL_DETAILS: 'PRINT_RENEWAL_DETAILS',
};

const CATEGORY = {
  MUSIC: 'MUSIC',
  VIDEO: 'VIDEO',
  PODCAST: 'PODCAST',
};

const TOP_UP_COST = {
  FOUR_DEVICE: 50,
  TEN_DEVICE: 100,
};

const PLAN_COST = {
  MUSIC: {
    FREE: 0,
    PERSONAL: 100,
    PREMIUM: 250,
  },
  VIDEO: {
    FREE: 0,
    PERSONAL: 200,
    PREMIUM: 500,
  },
  PODCAST: {
    FREE: 0,
    PERSONAL: 100,
    PREMIUM: 300,
  },
};

const SUBSCRIPTION_PERIOD = {
  FREE: 1,
  PERSONAL: 1,
  PREMIUM: 3,
};

const error = {
  type: {
    invalid_date: 'Invalid date',
    add_subscription_failed: 'ADD_SUBSCRIPTION_FAILED',
    add_topup_failed: 'ADD_TOPUP_FAILED',
  },
  message: {
    invalid_date: 'INVALID_DATE',
    duplicate_category: 'DUPLICATE_CATEGORY',
    duplicate_topup: 'DUPLICATE_TOPUP',
    subscription_not_found: 'SUBSCRIPTIONS_NOT_FOUND',
  },
};

const STATEMENT = {
  ACTION_INDEX: 0,
  COMMAND_INDEX: 1,
  OPTION_INDEX: 2
}

const REMINDER_DAY_COUNT = 10;

const NOT_SUBSCRIBED = false;

module.exports = {
  ACTION,
  CATEGORY,
  TOP_UP_COST,
  error,
  PLAN_COST,
  SUBSCRIPTION_PERIOD,
  STATEMENT,
  REMINDER_DAY_COUNT,
  NOT_SUBSCRIBED
};
