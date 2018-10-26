import treeBuilder from './treeBuilder';

/* eslint-disable */
const persons = [
  { id: 'P1', handle: 'p1', father: 'p2', mother: 'p3' },
  { id: 'P2', handle: 'p2', father: 'p4', mother: 'p5' },
  { id: 'P3', handle: 'p3', father: 'p6', mother: 'p7' },
  { id: 'P4', handle: 'p4', father: null, mother: 'p8' },
  { id: 'P5', handle: 'p5', father: null, mother: null },
  { id: 'P6', handle: 'p6', father: null, mother: null },
  { id: 'P7', handle: 'p7', father: null, mother: null },
  { id: 'P8', handle: 'p8', father: null, mother: null },
];
/* eslint-enable */

test('Create ancestor tree', () => {
  const tree = treeBuilder(persons, 'P1');

  expect(tree.parents[0].id).toBe('P2');
  expect(tree.parents[1].id).toBe('P3');

  expect(tree.parents[0].parents[0].id).toBe('P4');
  expect(tree.parents[0].parents[1].id).toBe('P5');
});
