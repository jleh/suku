import React from 'react';
import renderer from 'react-test-renderer';

import Sources from '.';

test('Renders source list', () => {
  const sources = [
    {
      title: 'Source title',
      page: '123',
      author: 'Author'
    }
  ];

  const tree = renderer
    .create(<Sources sources={sources} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders source list with links', () => {
  const sources = [
    {
      title: 'Source title',
      page: '123',
      author: 'Author',
      url: 'http://www.example.com'
    }
  ];

  const tree = renderer
    .create(<Sources sources={sources} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
