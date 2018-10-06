import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import LinkedPerson from './linkedPerson';

const persons = [
  {
    handle: 'H1',
    id: '1',
    name: 'Test Person',
    events: {
      birth: '1.1.1900',
      death: '1.1.1950'
    }
  }
];

test('Prints person name link', () => {
  const wrapper = shallow(<LinkedPerson personRef="H1" persons={persons} />);
  expect(wrapper.find(Link).length).toBe(1);
});

test.skip('Prints person birthday', () => {
  const wrapper = shallow(<LinkedPerson personRef="H1" persons={persons} />);
  expect(wrapper.find('div').find('span').text()).toEqual(expect.stringContaining('* 1.1.1900'));
});
