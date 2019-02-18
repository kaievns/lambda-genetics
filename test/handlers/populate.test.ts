import { populate } from '../../src/handlers';
import { invoke, mutate } from '../../src/utils';

jest.mock('../../src/utils', () => ({
  invoke: jest.fn().mockResolvedValue({}),
  mutate: jest.fn().mockReturnValue('new sequence')
}));

jest.mock('../../src/config', () => ({
  POPULATION_SIZE: 3,
  letters: 'abcdefgh'.split('')
}));

describe('populate', () => {
  it('generates new population', async () => {
    const result = await populate({
      winners: [
        'abcdefgh',
        'abcdefgh'.split('').reverse().join('')
      ],
      generation: 123
    });

    expect(mutate).toHaveBeenCalledWith('abcddcba')
    expect(invoke).toHaveBeenCalledWith({ 
      functionName: 'aggregate', 
      payload: { 
        generation: 124, 
        population: ['new sequence', 'new sequence', 'new sequence'] 
      } 
    })

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        population: [
          'new sequence',
          'new sequence',
          'new sequence'
        ],
        generation: 124
      })
    })
  });
})
