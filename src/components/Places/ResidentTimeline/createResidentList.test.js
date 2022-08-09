import createResidentList from './createResidentList';

describe('Create residents list', () => {
  test('Birth and death', () => {
    const personEvents = [
      { type: 'Birth', date: '1900-01-01' },
      { type: 'Death', date: '1980-01-01' },
    ];
    const persons = new Map([[1, { id: 1, events: { personEvents } }]]);
    const placeEvents = [{ type: 'Birth', id: 1, event: { date: '1900-01-01' } }];

    const list = createResidentList(placeEvents, persons);

    expect(list.length).toBe(1);
    expect(list[0].person.id).toBe(1);
    expect(list[0].start).toBe('1900-01-01');
    expect(list[0].end).toBe('1980-01-01');
  });

  test('Multiple residences', () => {
    const personEvents = [
      { type: 'Birth', date: '1900-01-01' },
      { type: 'Residence', date: '1910-01-01' },
      { type: 'Residence', date: '1920-01-01' },
      { type: 'Death', date: '1980-01-01' },
    ];
    const persons = new Map([[1, { id: 1, events: { personEvents } }]]);
    const placeEvents = [
      { type: 'Birth', id: 1, event: { date: '1900-01-01' } },
      { type: 'Residence', id: 1, event: { date: '1920-01-01' } },
    ];

    const list = createResidentList(placeEvents, persons);

    expect(list.length).toBe(2);
    expect(list[0].start).toBe('1900-01-01');
    expect(list[0].end).toBe('1910-01-01');
    expect(list[1].start).toBe('1920-01-01');
    expect(list[1].end).toBe('1980-01-01');
  });
});
