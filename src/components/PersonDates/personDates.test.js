import React from 'react';
import renderer from 'react-test-renderer';

import PersonDates from '.';

const renderComponent = events => renderer
  .create(<PersonDates events={events} />)
  .toJSON();

test('Renders person birth and death', () => {
  const events = {
    birth: '6.6.1800',
    death: '9.9.1890',
    birthPlace: { name: 'Place 1' },
    deathPlace: { name: 'Place 2' }
  };

  expect(renderComponent(events)).toMatchSnapshot();
});

test('Renders living person', () => {
  const events = {
    birth: '6.6.1800',
    birthPlace: { name: 'Place 1' }
  };

  expect(renderComponent(events)).toMatchSnapshot();
});

test('Renders person whose death date is only known', () => {
  const events = {
    death: '9.9.1890'
  };

  expect(renderComponent(events)).toMatchSnapshot();
});
