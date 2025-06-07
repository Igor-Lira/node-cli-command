const { applyFilter } = require('../filter-logic');

const mockData = [
  {
    name: 'Country A',
    people: [
      {
        name: 'Person X',
        animals: [{ name: 'Dog' }, { name: 'Cat' }],
      },
      {
        name: 'Person Y',
        animals: [{ name: 'Lion' }, { name: 'Tiger' }],
      },
    ],
  },
  {
    name: 'Country B',
    people: [
      {
        name: 'Person Z',
        animals: [{ name: 'Zebra' }, { name: 'Bear' }],
      },
    ],
  },
];

describe('applyFilter', () => {
  test('should filter animals by pattern', () => {
    const filtered = applyFilter(mockData, 'og');
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Country A');
    expect(filtered[0].people.length).toBe(1);
    expect(filtered[0].people[0].name).toBe('Person X');
    expect(filtered[0].people[0].animals.length).toBe(1);
    expect(filtered[0].people[0].animals[0].name).toBe('Dog');
  });

  test('should remove empty people arrays', () => {
    const filtered = applyFilter(mockData, 'liOn');
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Country A');
    expect(filtered[0].people.length).toBe(1);
    expect(filtered[0].people[0].name).toBe('Person Y');
    expect(filtered[0].people[0].animals[0].name).toBe('Lion');
  });

  test('should remove empty countries', () => {
    const filtered = applyFilter(mockData, 'nonexistent');
    expect(filtered.length).toBe(0);
  });

  test('should return original data if no filter pattern provided', () => {
    const original = JSON.parse(JSON.stringify(mockData));
    const filtered = applyFilter(original, null);
    expect(filtered).toEqual(original);
  });
});
