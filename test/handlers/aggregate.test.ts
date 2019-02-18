import { aggregate } from "../../src/handlers";
import { invoke } from '../../src/utils';

jest.mock('../../src/utils', () => ({
  invoke: jest.fn()
    .mockResolvedValueOnce({ sequence: 'asdf1', score: 1 })
    .mockResolvedValueOnce({ sequence: 'asdf2', score: 0.6 })
    .mockResolvedValueOnce({ sequence: 'asdf3', score: 0.3 })
    .mockResolvedValue({ score: 123 })
}));

describe('aggregate handler', () => {
  it('aggregates the calculation results for a population', async () => {
    const result = await aggregate({
      generation: 123,
      population: [
        'asdf1',
        'asdf2'
      ]
    });

    expect(invoke).toHaveBeenCalledWith({ functionName: 'calculate', payload: 'asdf1' });
    expect(invoke).toHaveBeenCalledWith({ functionName: 'calculate', payload: 'asdf2' });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        generation: 123,
        winners: [
          { sequence: 'asdf1', score: 1 },
          { sequence: 'asdf2', score: 0.6 }
        ]
      })
    })
  });
})
