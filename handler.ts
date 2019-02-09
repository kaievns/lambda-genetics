import { APIGatewayProxyHandler } from 'aws-lambda';
import { Lambda } from 'aws-sdk';

const lambda = new Lambda();
const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

export const generation: APIGatewayProxyHandler = async () => {
  const sequences = new Array(100).fill(null).map(() => {
    const randoms = letters.sort(() => Math.random() > 0.5 ? 1 : -1);
    return randoms.join('');
  });

  const result = await Promise.all(sequences.map(sequence => 
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

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  };
}

export const calculate: APIGatewayProxyHandler = async (sequence) => {
  const startedAt = Date.now();

  return {
    statusCode: 200,
    body: JSON.stringify({
      sequence,
      score: Math.random(),
      time: Date.now() - startedAt
    })
  }
}
