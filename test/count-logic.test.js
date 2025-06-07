const { applyCount } = require('../count-logic');

const mockData = [
  {
    name: 'Country Alpha',
    people: [
      {
        name: 'Person One',
        animals: [{ name: 'A' }, { name: 'B' }],
      },
      {
        name: 'Person Two',
        animals: [{ name: 'C' }, { name: 'D' }, { name: 'E' }],
      },
    ],
  },
  {
    name: 'Country Beta',
    people: [
      {
        name: 'Person Three',
        animals: [{ name: 'F' }],
      },
    ],
  },
];

describe('applyCount', () => {
  test('should append animal count to person names', () => {
    const counted = applyCount(mockData);
    expect(counted[0].people[0].name).toBe('Person One [2]');
    expect(counted[0].people[1].name).toBe('Person Two [3]');
    expect(counted[1].people[0].name).toBe('Person Three [1]');
  });

  test('should append people count to country names', () => {
    const counted = applyCount(mockData);
    expect(counted[0].name).toBe('Country Alpha [2]');
    expect(counted[1].name).toBe('Country Beta [1]');
  });

  test('should not mutate original data', () => {
    const original = JSON.parse(JSON.stringify(mockData));
    applyCount(mockData);
    expect(mockData).toEqual(original);
  });
});
