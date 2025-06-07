const {COMMANDS} = require("./constants");

const parseCommands = (rawArgs) => {
  const userCommands = {
    filter: null,
    count: false,
    unknown: [],
  };

  const args = rawArgs.slice(2);

  for (let arg of args) {
    if (typeof arg === 'string') {
      if (arg.startsWith(COMMANDS.FILTER)) {
        const value = arg.substring(COMMANDS.FILTER.length);
        if (value) {
          userCommands.filter = value;
        } else {
          userCommands.unknown.push(arg);
        }
      } else if (arg === COMMANDS.COUNT) {
        userCommands.count = true;
      } else if (arg.startsWith('--')) {
        userCommands.unknown.push(arg);
      }
    }
  }

  return userCommands;
}

module.exports = { parseCommands };
