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


module.exports = {
  applyFilter,
}
