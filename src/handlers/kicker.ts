import { letters } from "../config";
import { invoke } from "../utils";

export default async () => {
  const startingSequence = letters.sort().reverse().join('');

  await invoke({
    functionName: 'looper',
    payload: {
      generation: 1,
      winners: [{
        sequence: startingSequence,
        score: 0,
        time: 0
      }]
    }
  })

  return {
    statusCode: 200,
    body: '{}'
  }
}
