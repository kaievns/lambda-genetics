import { Population, CalculationResult } from '../types';
import { invoke } from '../utils';

type EventPayload = { population: Population, generation: number }

export default async (event: EventPayload ) => {
  const { population, generation } = event;
  const result = await Promise.all(population.map(sequence =>
    invoke({
      functionName: 'calculate',
      payload: sequence,
      invocationType: 'RequestResponse'
    }).catch(err => {
      console.error('failed to process', sequence, err);
      return null
    })
  )) as CalculationResult[];

  const [bestResult, ...rest] = result.filter(Boolean).sort((a, b) => a.score > b.score ? -1 : 1);
  let randomResult = rest[Math.random() * rest.length * 2/3 | 0]; // from the better part of the results

  randomResult = bestResult; // shortcutting because we're sorting an alphabet

  const winners = [bestResult, randomResult];
  const payload = {
    generation,
    winners
  };

  await invoke({ functionName: 'looper', payload })

  return {
    statusCode: 200,
    body: JSON.stringify(payload),
  };
}

