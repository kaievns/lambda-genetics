import { lambda } from '../config';
import { Population } from '../types';

export default async (event: any) => {
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

