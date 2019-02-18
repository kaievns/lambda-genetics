import { kicker } from "../../src/handlers";
import { invoke } from "../../src/utils";
import { letters } from "../../src/config";

jest.mock('../../src/utils', () => ({
  invoke: jest.fn().mockResolvedValue({})
}));


describe('kicker function', () => {
  it('kicks in the looper with the generation 1 and a random sequence', async () => {
    const result = await kicker();

    expect(invoke).toHaveBeenCalledWith({
      functionName: 'looper',
      payload: {
        generation: 1,
        winners: [{
          sequence: letters.sort().reverse().join(''),
          score: 0,
          time: 0
        }]
      }
    })

    expect(result).toEqual({
      statusCode: 200,
      body: '{}'
    })
  })
})
