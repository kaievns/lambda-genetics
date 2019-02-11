import { Sequence, Population } from '../types';
import { POPULATION_SIZE, lambda } from '../config';

const mutate = (sequence: Sequence): Sequence => {
  const [pos1, pos2] = [
    Math.random() * sequence.length | 0,
    Math.random() * sequence.length | 0
  ].sort();

  return `${
    sequence.substr(0, pos1)
    }${
    sequence[pos1]
    }${
    sequence.substr(pos1 + 1, pos2)
    }${
    sequence[pos2]
    }${
    sequence.substr(pos2 + 1)
    }`;
}

export default async (winners) => {
  const [best, rando] = winners as Sequence[];
  const midway = Math.ceil(best.length - 1);
  const offspring = `${best.substr(0, midway)}${rando.substr(midway)}`;


  const population: Population = new Array(POPULATION_SIZE).fill(null).map(() =>
    mutate(mutate(mutate(mutate(offspring))))
  );

  lambda.invoke({
    FunctionName: 'lambda-genetics-dev-generation',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(population)
  })

  return {
    statusCode: 200,
    body: JSON.stringify(population)
  }
}
