import React from 'react';
import renderer from 'react-test-renderer';

import PersonEvents from '.';

const renderComponent = (events, birth) =>
  renderer.create(<PersonEvents events={events} birth={birth} />).toJSON();

test('Renders nothing if no events', () => {
  const events = undefined;
  const birth = undefined;

  expect(renderComponent(events, birth)).toMatchSnapshot();
});

test('Renders events even if birthday is unknown', () => {
  const events = [
    {
      id: 1,
      date: '1900-06-06',
      type: 'Residence',
      place: { name: 'Place' },
    },
  ];
  const birth = undefined;

  expect(renderComponent(events, birth)).toMatchSnapshot();
});

test('Renders person age on event', () => {
  const events = [
    {
      id: 1,
      date: '1900-06-06',
      type: 'Residence',
      place: { name: 'Place' },
    },
  ];
  const birth = '1850-06-06';

  expect(renderComponent(events, birth)).toMatchSnapshot();
});
