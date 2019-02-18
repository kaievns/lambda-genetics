import { Sequence, Population } from '../types';
import { POPULATION_SIZE } from '../config';
import { invoke, mutate } from '../utils';

export default async ({ winners, generation = 1 }: any) => {
  const [best, rando] = winners as Sequence[];
  const midway = Math.ceil((best.length - 1) / 2);
  const offspring = `${best.substr(0, midway)}${rando.substr(midway)}`;

  const population: Population = new Array(POPULATION_SIZE).fill(null).map(() =>
    mutate(mutate(mutate(offspring)))
  );

  const payload = {
    population,
    generation: generation + 1
  };

  invoke({
    functionName: 'aggregate',
    payload
  })

  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}
