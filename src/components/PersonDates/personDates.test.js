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
    birthISO: '1800-06-06',
    deathISO: '1890-09-09',
    birthPlace: { name: 'Place 1' },
    deathPlace: { name: 'Place 2' }
  };

  expect(renderComponent(events)).toMatchSnapshot();
});

test('Renders living person', () => {
  const events = {
    birth: '6.6.1800',
    birthISO: '1890-06-06',
    birthPlace: { name: 'Place 1' }
  };

  expect(renderComponent(events)).toMatchSnapshot();
});

test('Renders person whose death date is only known', () => {
  const events = {
    death: '9.9.1890',
    deathISO: '1890-09-09'
  };

  expect(renderComponent(events)).toMatchSnapshot();
});
