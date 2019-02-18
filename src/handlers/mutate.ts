import { Sequence } from '../types';

export default (sequence: Sequence): Sequence => {
  const [pos1, pos2] = distinctlyRandomPositions(sequence.length);

  const pre = sequence.substring(0, pos1);
  const symbol1 = sequence[pos1];
  const middle = sequence.substring(pos1 + 1, pos2);
  const symbol2 = sequence[pos2];
  const end = sequence.substr(pos2 + 1);

  return [pre, symbol2, middle, symbol1, end].join('');
}

/**
 * Generates two random non-equal positions in correct order
 * 
 * @param {number} length of the sequence
 * @return {number[]} positions
 */
function distinctlyRandomPositions(length: number): [number, number] {
  const pos1 = Math.random() * length | 0;
  let pos2 = pos1;
  
  while (pos1 === pos2) {
    pos2 = Math.random() * length | 0;
  }

  return pos1 > pos2 ? [pos2, pos1] : [pos1, pos2];
}
