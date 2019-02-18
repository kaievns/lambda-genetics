import mutate from '../src/handlers/mutate';

describe('mutate', () => {
  it('swaps random letters in the sequence', () => {
    const sequences = new Array(100).fill(null).map(() => mutate('asdf'));
    const uniques = sequences.reduce((uniq, seq) => 
      uniq.includes(seq) ? uniq : [...uniq, seq]
    , []);

    expect(uniques.sort()).toEqual([
      "adsf",
      "afds",
      "asfd",
      "dsaf",
      "fsda",
      "sadf",
    ])
  })
})
