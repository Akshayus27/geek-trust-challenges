const moment = require('moment');
const { monthsAvailableForSubscription } = require('../constants');

const formatDate = (date) => {
  const formattedDate = moment(date, ['DD-MM-YYYY']).format('DD-MM-YYYY');
  return formattedDate;
};

const renewalReminderDate = (plan) => {
  const renewalReminder = moment(SUBSCRIPTION.startDate, ['DD-MM-YYYY'])
    .add(monthsAvailableForSubscription[plan], 'months')
    .subtract(10, 'days')
    .format('DD-MM-YYYY');
  return renewalReminder;
};

module.exports = { formatDate, renewalReminderDate };
