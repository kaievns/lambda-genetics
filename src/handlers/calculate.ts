import { Sequence, CalculationResult } from '../types';
import { letters } from '../config';

const IDEAL_STATE = letters.sort().join('');
const grade = (sequence: Sequence): number => {
  const numberOfMatchingLetters = sequence.split('')
    .reduce((result, letter, index) =>
      result + (letter === IDEAL_STATE[index] ? 1 : 0)
    , 0);
  
  return numberOfMatchingLetters / letters.length;
};

export default async (event: any) => {
  const sequence = event as Sequence;
  const startedAt = Date.now();
  const result: CalculationResult = {
    sequence,
    score: grade(sequence),
    time: Date.now() - startedAt
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
