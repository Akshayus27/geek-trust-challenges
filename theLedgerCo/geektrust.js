const fs = require('fs');
const filename = process.argv[2];

const StatementService = require('./services/statement');
const statementService = new StatementService();

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  let inputLines = data.toString().split('\n');

  // Add your code here to process input commands
  let output = [];
  for (let i = 0; i < inputLines.length; i++) {
    const result = statementService.processStatement(inputLines[i]);
    if (result) output.push(result);
  }

  // Write the output to console
  console.log(output.join('\n'));
});
