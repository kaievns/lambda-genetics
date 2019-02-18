import { cross } from "../../src/utils";

describe('cross breeding', () => {
  it('creates correct sequences with uniq values', () => {
    expect(cross('asdf1234', 'a1s2d3f4')).toEqual('asdf1324');
  });

  it('works great with the uneven number of symbols', () => {
    expect(cross('asdf123', 'a1s2d3f')).toEqual('asd213f');
  })
})
