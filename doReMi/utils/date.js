const moment = require('moment');
const { SUBSCRIPTION_PERIOD, REMINDER_DAY_COUNT } = require('../constants');

const formatDate = (date) => {
  const formattedDate = moment(date, ['DD-MM-YYYY']).format('DD-MM-YYYY');
  return formattedDate;
};

const reminderDate = (plan) => {
  const renewalReminder = moment(SUBSCRIPTION.startDate, ['DD-MM-YYYY'])
    .add(SUBSCRIPTION_PERIOD[plan], 'months')
    .subtract(REMINDER_DAY_COUNT, 'days')
    .format('DD-MM-YYYY');
  return renewalReminder;
};

module.exports = { formatDate, reminderDate };
