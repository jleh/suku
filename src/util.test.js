import {
  renderDate,
  getCoordinates,
  renderAge,
  createPlacesMap,
  createRefMap,
  getPlaceEvents,
} from './util';

describe('Render date', () => {
  test('Render date, only year value', () => expect(renderDate('1880')).toBe('1880'));
  test('Render date', () => expect(renderDate('1880-06-06')).toBe('06.06.1880'));
});

test('Get coordinates for place', () => {
  expect(getCoordinates({ lat: 62.1, lng: 25.2 })).toEqual([62.1, 25.2]);
});

describe('Render age', () => {
  test('Render age', () => expect(renderAge('1900-01-01', '1950-06-06')).toBe('50 vuotta'));
  test('Render age, only year can be given', () =>
    expect(renderAge('1900-01-01', '1950')).toBe('50 vuotta'));
  test('Do not render age for birth', () =>
    expect(renderAge('1900-01-01', '1900-01-01')).toBe(null));
  test('Do not render age if birth is missing', () =>
    expect(renderAge(null, '1900-01-01')).toBe(null));
  test('Do not render age if event date is missing', () =>
    expect(renderAge('1900-01-01', null)).toBe(null));
});

test('Create places map', () => {
  const places = [
    {
      id: 1,
      name: 'A',
      children: [
        {
          id: 2,
          name: 'B',
          children: [
            {
              id: 3,
              name: 'C',
              children: [
                {
                  id: 4,
                  name: 'D',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const map = createPlacesMap(places);

  expect(map.get(1).name).toBe('A');
  expect(map.get(2).name).toBe('B');
  expect(map.get(3).name).toBe('C');
  expect(map.get(4).name).toBe('D');
});

test('Create ref map', () => {
  const map = createRefMap([{ handle: 'h1', name: 'A' }]);

  expect(map.get('h1').name).toBe('A');
});

test('Get place events', () => {
  const persons = [
    {
      name: 'Person',
      id: 'H1',
      events: {
        personEvents: [
          {
            place: { id: 'P1' },
            type: 'TEST',
            description: 'test',
          },
          {
            place: { id: 'P2' },
            type: 'TEST2',
            description: 'test',
          },
        ],
      },
    },
  ];

  const events = getPlaceEvents('P1', persons);

  expect(events.length).toBe(1);
  expect(events[0]).toEqual({
    name: 'Person',
    id: 'H1',
    type: 'TEST',
    event: {
      place: { id: 'P1' },
      description: 'test',
      type: 'TEST',
    },
  });
  expect(getPlaceEvents('P1', [{}]).length).toBe(0);
});
