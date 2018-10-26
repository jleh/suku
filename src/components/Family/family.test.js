import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Family from '.';

const persons = new Map();

persons.set('H1', {
  handle: 'H1',
  id: '1',
  name: 'Test Person',
  events: {
    birth: '1.1.1900',
    death: '1.1.1950'
  }
});
persons.set('H2', {
  handle: 'H2',
  id: '2',
  name: 'Other Person',
  events: {}
});

const renderComponent = families => renderer
  .create(
    <MemoryRouter>
      <Family families={families} persons={persons} />
    </MemoryRouter>
  )
  .toJSON();

test('Renders family', () => {
  const families = [
    {
      spouse: 'H2',
      children: ['H1']
    }
  ];
  expect(renderComponent(families)).toMatchSnapshot();
});
