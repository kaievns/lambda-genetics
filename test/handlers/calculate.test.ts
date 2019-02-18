import { calculate } from '../../src/handlers';
import { letters } from '../../src/config';

describe('calculate handler', () => {
  it('calculates a score for a text based on how many letters fit', async () => {
    const sequence = letters.sort().slice(0, letters.length/2).join('');
    const result = await calculate(sequence);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        sequence,
        score: 0.5,
        time: 0
      })
    });
  });

  it('scores it 1 if it is a full match', async () => {
    const sequence = letters.sort().join('');
    const result = await calculate(sequence);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        sequence,
        score: 1,
        time: 0
      })
    });
  });

  it('scores it 0 if it is a full non match', async () => {
    const sequence = ''; // nothing will match an empty string
    const result = await calculate(sequence);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        sequence,
        score: 0,
        time: 0
      })
    });
  })
});
