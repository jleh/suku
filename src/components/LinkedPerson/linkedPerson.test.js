import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import LinkedPerson from '.';

const persons = new Map();

persons.set('H1', {
  handle: 'H1',
  id: '1',
  name: 'Test Person',
  events: {
    birth: '1.1.1900',
    death: '1.1.1950',
  },
});
persons.set('H2', {
  handle: 'H2',
  id: '2',
  name: 'Other Person',
  events: {},
});

const renderComponent = (id) =>
  renderer
    .create(
      <MemoryRouter>
        <LinkedPerson personRef={id} persons={persons} />
      </MemoryRouter>
    )
    .toJSON();

test('Prints person with birth and death dates', () => {
  expect(renderComponent('H1')).toMatchSnapshot();
});

test('Does not fail if person is missing', () => {
  expect(renderComponent('not-fond')).toMatchSnapshot();
});

test('Renders if birth or death is missing', () => {
  expect(renderComponent('H2')).toMatchSnapshot();
});
