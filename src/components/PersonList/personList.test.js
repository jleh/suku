import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { PersonListWithoutContext } from '.';

const renderComponent = (persons) =>
  renderer
    .create(
      <MemoryRouter>
        <PersonListWithoutContext personList={persons} />
      </MemoryRouter>
    )
    .toJSON();

test('Renders nothing if no events', () => {
  const persons = [
    {
      id: 'H1',
      name: 'Test B',
    },
    {
      id: 'H2',
      name: 'Test C',
    },
    {
      id: 'H3',
      name: 'Test A',
    },
    {
      id: 'H4',
      name: 'Test af D',
    },
    {
      id: 'H5',
      name: ' Private',
    },
  ];

  expect(renderComponent(persons)).toMatchSnapshot();
});
