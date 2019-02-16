import { Lambda } from 'aws-sdk';

export const lambda = new Lambda();

type Params = {
  invocationType?: 'RequestResponse',
  functionName: string,
  payload: any
};

export const invoke = async <T>({ functionName, payload, invocationType = 'RequestResponse' }: Params) => 
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
          const parsedData = JSON.parse(data.Payload as string);
          resolve(JSON.parse(parsedData.body));
        } catch (error) {
          reject(error);
        }
      }
    });
  })
