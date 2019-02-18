/**
 * Creates a cross-breed between the two sequences
 */

import { Sequence } from "../types";

export default (seq1: Sequence, seq2: Sequence): Sequence => {
  const { length } = seq1;
  const midway = Math.round((length - 1) / 2);
  const offspring = new Array(length).fill(null);

  // filling the first half
  seq1.substr(0, midway).split('').forEach((symbol, index) => {
    offspring[index] = symbol;
  });

  // filling the second half uniqs in correct spots
  seq2.split('').reverse().forEach((symbol, index) => {
    if (!offspring.includes(symbol)) {
      const pos = length - index - 1;

      if (offspring[pos] === null) {
        offspring[pos] = symbol;
      }
    }
  });

  // filling the leftovers into empty slots
  seq2.split('').forEach(symbol => {
    if (!offspring.includes(symbol)) {
      const index = offspring.indexOf(null);
      offspring[index] = symbol;
    }
  })

  return offspring.join('');
}
