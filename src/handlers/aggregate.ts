import { Population } from '../types';
import { invoke } from '../utils';

export default async (event: any) => {
  const population = event as Population;
  const result = await Promise.all(population.map(sequence =>
    invoke({
      functionName: 'calculate',
      payload: sequence
    }).catch(err => {
      console.error('failed to process', sequence, err);
      return null
    })
  ));

  console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  };
}

