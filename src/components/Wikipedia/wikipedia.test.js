import React from 'react';
import renderer from 'react-test-renderer';

import Wikipedia from '.';

const renderComponent = (person) => renderer.create(<Wikipedia person={person} />).toJSON();

test('Renders wikipedia link if person has wikipedia page', () => {
  const person = { wikipedia: 'http://fi.wikipedia.fi' };
  expect(renderComponent(person)).toMatchSnapshot();
});

test('Empty if person has no wikipedia link', () => {
  const person = {};
  expect(renderComponent(person)).toMatchSnapshot();
});
