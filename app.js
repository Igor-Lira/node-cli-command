const COMMANDS = {
  FILTER: '--filter=',
  COUNT: '--count',
}

const DATA = require('./data');

const getData = () => {
  return JSON.parse(JSON.stringify(DATA)).data;
}

const printData = (data) => {
  console.log(JSON.stringify(data, null, 2));
}

const parseCommands = (arguments) => {
  const userCommands = {
    filter: null,
    count: false,
    unknown: [],
  };

  const args = arguments.slice(2);

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

const applyFilter = (data, filter) => {
  return data.map(country => applyFilterToCountry(country, filter)).filter(country => !!country);
}

const applyFilterToCountry = (country, filter) => {
  if (country?.people?.length > 0) {
    const filteredPeople = country.people.map(person => applyFilterToPerson(person, filter)).filter(person => !!person);
    if (filteredPeople?.length > 0) {
      return { ...country, people: filteredPeople };
    }
  }
  return null;
}

const applyFilterToPerson = (people, filter) => {
  if (people?.animals?.length > 0) {
    const filteredAnimals = people.animals.map(animal => applyFilterToAnimal(animal, filter)).filter(animal => !!animal);
    if (filteredAnimals?.length > 0) {
      return { ...people, animals: filteredAnimals };
    }
  }
  return null;
}


const applyFilterToAnimal = (animal, filter) => {
  const matches = animal?.name?.toString()?.toLowerCase().includes(filter.toString().toLowerCase());
  if (matches) {
    return animal;
  }
  return null;
}

const applyCount = (data) => {
  return data.map(country => {
    const countPeople = country.people.map(person => formatPersonName(person));
    return { ...country, people: countPeople };
  });
}

const formatPersonName = (person) => {
  const countAnimals = person.animals.length;
  person.name = `${person.name} [${countAnimals}]`;
  return person;
}

function main() {
  const commands = parseCommands(process.argv);
  let data = getData();
  if (commands.filter) {
    data = applyFilter(data, commands.filter);
  }
  if (commands.count) {
    data = applyCount(data);
  }
  printData(data);
}

main();
