import { Lambda } from 'aws-sdk';

export const lambda = new Lambda();

type Params = {
  invocationType?: 'RequestResponse' | 'Event',
  functionName: string,
  payload: any
};

export default async <T>({ functionName, payload, invocationType = 'Event' }: Params) =>
  new Promise<T>((resolve, reject) => {
    const params = {
      FunctionName: `lambda-genetics-dev-${functionName}`,
      InvocationType: invocationType,
      Payload: JSON.stringify(payload)
    }

    lambda.invoke(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const emptyPayload = JSON.stringify({ body: '{}' });
          const parsedData = JSON.parse(data.Payload as string || emptyPayload);
          resolve(JSON.parse(parsedData.body));
        } catch (error) {
          reject(error);
        }
      }
    });
  })
