import { APIGatewayProxyHandler } from 'aws-lambda';
import { Lambda } from 'aws-sdk';

const lambda = new Lambda();
const POPULATION_SIZE = 100;

const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

type Sequence = string;
type Population = Sequence[]

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
    sequence.substr(pos2+1)
  }`;
}

const IDEAL_STATE = letters.sort().join('');
const grade = (sequence: Sequence): number =>
  sequence.split('').reduce((result, letter, index) => 
    result + (letter === IDEAL_STATE[index] ? 1 : 0)
  , 0);

export const createPopulation = async (winners) => {
  const [best, rando] = winners as Sequence[];
  const midway = Math.ceil(best.length - 1);
  const offspring = `${best.substr(0, midway)}${rando.substr(midway)}`;

  
  const population = new Array(POPULATION_SIZE).fill(null).map(() => 
    mutate(mutate(mutate(mutate(offspring))))
  );

  lambda.invoke({
    FunctionName: 'lambda-genetics-dev-generation',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(population)
  })

  return {
    statusCode: 200,
    body: population
  }
}

export const generation: APIGatewayProxyHandler = async (event: any) => {
  const population = event as Population;
  const result = await Promise.all(population.map(sequence => 
    new Promise(resolve => {
      const params = {
        FunctionName: 'lambda-genetics-dev-calculate',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(sequence)
      };

      lambda.invoke(params, (err, data) => {
        let result = null;

        if (err) {
          console.error('failed to process', sequence, err);
        } else {
          try {
            const parsedData = JSON.parse(data.Payload as string);
            result = JSON.parse(parsedData.body);
          } catch (error) {
            console.error('failed to parse response from calculation of', sequence, err);
          }
        }

        resolve(result);
      });
    })
  ));

  console.log(result); 

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  };
}

export const calculate: APIGatewayProxyHandler = async (event: any) => {
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
