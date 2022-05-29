const { STATEMENT } = require('../constants');

const extractInputStatement = (inputStatement) => {
  const statement = inputStatement.split(' ');
  const action = statement[STATEMENT.ACTION_INDEX];

  return { action, statement };
};

module.exports = { extractInputStatement };
