const applyCount = (data) => {
  return data.map(country => {
    const countPeople = country.people.map(person => formatPersonName(person));
    country = formatCountryName(country);
    return { ...country, people: countPeople };
  });
}
const formatCountryName = (country) => {
  const countPeople = country.people.length;
  const name = `${country.name} [${countPeople}]`;
  return { ...country, name };
}

const formatPersonName = (person) => {
  const countAnimals = person.animals.length;
  const name = `${person.name} [${countAnimals}]`;
  return { ...person, name };
}

module.exports = {
  applyCount,
}
