import * as chai from 'chai';
import { describe, it } from 'mocha';

import { filterTree } from './recursive-methods';

const expect = chai.expect;

//A
// - B
// - C
// - - D
//E
// - F
// - G
// - - H
// - - I
describe('filterTree', () => {
  const A = { name: 'A', id: 1, idParent: 0 };
  const B = { name: 'B', id: 2, idParent: 1 };
  const C = { name: 'C', id: 3, idParent: 1 };
  const D = { name: 'D', id: 4, idParent: 3 };
  const E = { name: 'E', id: 5, idParent: 0 };
  const F = { name: 'F', id: 6, idParent: 5 };
  const G = { name: 'G', id: 7, idParent: 5 };
  const H = { name: 'H', id: 8, idParent: 7 };
  const I = { name: 'I', id: 9, idParent: 7 };
  const nodes = [A, B, C, D, E, F, G, H, I];

  it('should be able to filter a tree and return the nodes pased on the predicate', () => {
    expect(
      filterTree({
        nodes,
        predicate: (el) => el.name === 'C',
        getId: (el) => el.id,
        getParentId: (el) => el.idParent,
        withParents: false,
        withChildren: false,
      })
    ).to.deep.eq([C]);
  });

  it('should be able to filter a tree and return the nodes pased on the predicate with parents and children', () => {
    expect(
      filterTree({
        nodes,
        predicate: (el) => el.name === 'C',
        getId: (el) => el.id,
        getParentId: (el) => el.idParent,
        withParents: true,
        withChildren: true,
      })
    ).to.deep.equal([C, A, D]);
  });

  it('should return an empty array if given an empty array', () => {
    expect(
      filterTree({
        nodes: [],
        predicate: (el) => el.name === 'C',
        getId: (el) => el.id,
        getParentId: (el) => el.idParent,
      })
    ).to.deep.equal([]);
  });
});
