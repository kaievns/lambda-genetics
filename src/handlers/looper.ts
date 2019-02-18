import { CalculationResult, Population } from "../types";
import { STOP_AFTER_GENERATION } from "../config";
import { invoke } from "../utils";

type LooperPayload = {
  generation: number;
  winners: CalculationResult[]
};

const returnState = {
  statusCode: 200,
  body: '{}'
}

export default async (event: LooperPayload) => {
  const { generation, winners } = event;
  const [bestResult, randomResult = bestResult] = winners;
  const { sequence, score } = bestResult;

  const itsTimeToStop = score === 1 || generation >= STOP_AFTER_GENERATION;

  if (itsTimeToStop) {
    console.log(`Breaking at generation ${generation}, winner: ${sequence}, score: ${score}`);
    return returnState; // breaking
  }
  
  console.log(`Processing generation: ${generation}, winner: ${sequence}, score: ${score}`);
  
  invoke({
    functionName: 'populate',
    payload: {
      generation,
      winners: [bestResult.sequence, randomResult.sequence]
    }
  });

  return returnState;
}
