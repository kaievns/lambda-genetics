import { cross } from "../../src/utils";

describe('cross breeding', () => {
  it('creates correct sequences with uniq values', () => {
    expect(cross('abcdefgh', 'hgfedcba')).toEqual('abcdhgfe');
  });

  it('works great with the uneven number of symbols', () => {
    expect(cross('abcdefg', 'gfedcba')).toEqual('abcgfed');
  })
})
