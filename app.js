const { printData, getData } = require('./data-handler');
const { parseCommands } = require('./cli-parser');
const { applyFilter } = require('./filter-logic');
const { applyCount } = require('./count-logic');

function main() {
  const commands = parseCommands(process.argv);

  let data = getData();

  if (commands.filter) {
    data = applyFilter(data, commands.filter);
  }
  if (commands.count) {
    data = applyCount(data);
  }

  if (commands.unknown?.length > 0) {
    console.warn(`Unknown command ${commands.unknown.join(', ')}`);
  }

  printData(data);
}

main();
