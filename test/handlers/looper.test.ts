import { looper } from "../../src/handlers";
import { STOP_AFTER_GENERATION } from "../../src/config";
import { invoke } from "../../src/utils";

jest.mock('../../src/utils', () => ({
  invoke: jest.fn().mockResolvedValue({})
}));

console.log = jest.fn();

describe('looper function handler', () => {
  it('stops if the generation had reached the limit', async () => {
    const result = await looper({
      generation: STOP_AFTER_GENERATION,
      winners: [{
        sequence: 'WINNER_SEQUENCE',
        score: 0.99,
        time: 0
      }]
    });

    expect(console.log).toHaveBeenCalledWith(
      'Breaking at generation 100, winner: WINNER_SEQUENCE, score: 0.99'
    );

    expect(result).toEqual({
      statusCode: 200,
      body: '{}'
    });
  });

  it('stops if the score reached max', async () => {
    const result = await looper({
      generation: STOP_AFTER_GENERATION - 1,
      winners: [{
        sequence: 'WINNER_SEQUENCE',
        score: 1,
        time: 0
      }]
    });

    expect(console.log).toHaveBeenCalledWith(
      'Breaking at generation 99, winner: WINNER_SEQUENCE, score: 1'
    );

    expect(result).toEqual({
      statusCode: 200,
      body: '{}'
    });
  });

  it('proceedes if neither of the conditions was met', async () => {
    const result = await looper({
      generation: STOP_AFTER_GENERATION - 1,
      winners: [{
        sequence: 'BEST_SEQUENCE',
        score: 0.6,
        time: 0
      }, {
        sequence: 'RANDOM_SEQUENCE',
        score: 0.5,
        time: 0
      }]
    });

    expect(console.log).toHaveBeenCalledWith(
      'Processing generation: 99, winner: BEST_SEQUENCE, score: 0.6'
    );

    expect(invoke).toHaveBeenCalledWith({
      functionName: 'populate',
      payload: {
        generation: STOP_AFTER_GENERATION - 1,
        winners: ['BEST_SEQUENCE', 'RANDOM_SEQUENCE']
      }
    })

    expect(result).toEqual({
      statusCode: 200,
      body: '{}'
    });
  });
});
