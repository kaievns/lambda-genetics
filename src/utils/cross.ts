/**
 * Creates a cross-breed between the two sequences
 */

import { Sequence } from "../types";

export default (seq1: Sequence, seq2: Sequence): Sequence => {
  const midway = Math.round((seq1.length - 1) / 2);
  const offspring = seq1.substr(0, midway).split('');

  seq2.split('').forEach(symbol => {
    if (!offspring.includes(symbol)) {
      offspring.push(symbol);
    }
  })

  return offspring.join('');
}
