import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import LinkedPerson from '.';

const persons = [
  {
    handle: 'H1',
    id: '1',
    name: 'Test Person',
    events: {
      birth: '1.1.1900',
      death: '1.1.1950'
    }
  },
  {
    handle: 'H2',
    id: '2',
    name: 'Other Person',
    events: {}
  }
];

test('Prints person name link', () => {
  const wrapper = shallow(<LinkedPerson personRef="H1" persons={persons} />);
  expect(wrapper.find(Link).length).toBe(1);
});

test('Prints person birthday', () => {
  const wrapper = shallow(<LinkedPerson personRef="H1" persons={persons} />);
  expect(wrapper.find('div').find('span').text()).toEqual(expect.stringContaining('* 1.1.1900'));
});

test('Prints person deathday', () => {
  const wrapper = shallow(<LinkedPerson personRef="H1" persons={persons} />);
  expect(wrapper.find('div').find('span').text()).toEqual(expect.stringContaining('† 1.1.1950'));
});

test('Does not fail if person is missing', () => {
  const wrapper = shallow(<LinkedPerson personRef="not-found" persons={persons} />);
  expect(wrapper.text()).toBe('');
});

test('Renders if birth or death is missing', () => {
  const wrapper = shallow(<LinkedPerson personRef="H2" persons={persons} />);
  expect(wrapper.find(Link).length).toBe(1);
});
