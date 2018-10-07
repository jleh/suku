import React from 'react';
import { shallow } from 'enzyme';

import Wikipedia from '.';

test('Renders wikipedia link if person has wikipedia page', () => {
  const person = { wikipedia: 'http://fi.wikipedia.fi' };
  const component = shallow(<Wikipedia person={person} />);

  expect(component.find('a').length).toBe(1);
});

test('Empty if person has no wikipedia link', () => {
  const person = {};
  const component = shallow(<Wikipedia person={person} />);

  expect(component.find('a').length).toBe(0);
});
