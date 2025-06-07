const { printData, getData } = require('./src/utils/data-handler');
const { parseCommands } = require('./src/utils/cli-parser');
const { applyFilter } = require('./src/commands/filter');
const { applyCount } = require('./src/commands/count');

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
