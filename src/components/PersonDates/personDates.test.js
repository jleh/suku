import React from 'react';
import { shallow } from 'enzyme';

import PersonDates from '.';

test('Renders person birth and death', () => {
  const events = {
    birth: '6.6.1800',
    death: '9.9.1890',
    birthPlace: { name: 'Place 1' },
    deathPlace: { name: 'Place 2' }
  };

  expect(shallow(<PersonDates events={events} />).find('div').length).toBe(3);
});

test('Renders living person', () => {
  const events = {
    birth: '6.6.1800',
    birthPlace: { name: 'Place 1' }
  };

  expect(shallow(<PersonDates events={events} />).find('div').length).toBe(2);
});

test('Renders person whose death date is only known', () => {
  const events = {
    death: '9.9.1890'
  };

  expect(shallow(<PersonDates events={events} />).find('div').length).toBe(2);
});
