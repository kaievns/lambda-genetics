import { Sequence } from '../types';
import { letters } from '../config';

const IDEAL_STATE = letters.sort().join('');
const grade = (sequence: Sequence): number =>
  sequence.split('').reduce((result, letter, index) =>
    result + (letter === IDEAL_STATE[index] ? 1 : 0)
    , 0);

export default async (event: any) => {
  const sequence = event as Sequence;
  const startedAt = Date.now();

  return {
    statusCode: 200,
    body: JSON.stringify({
      sequence,
      score: grade(sequence),
      time: Date.now() - startedAt
    })
  }
}
