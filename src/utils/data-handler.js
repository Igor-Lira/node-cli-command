const DATA = require('../data/data');

const getData = () => {

  if (!DATA || !DATA.data) {
    console.error('Unable to process data');
    process.exit(1);
  }

  return JSON.parse(JSON.stringify(DATA)).data;
}

const printData = (data) => {
  console.log(JSON.stringify(data, null, 2));
}

module.exports = {
  getData,
  printData,
}
