import { invoke } from "../src/utils";

jest.mock('aws-sdk', () => ({
  Lambda: jest.fn().mockImplementation(() => ({
    invoke: jest.fn((_, callback) => callback(null, { 
      Payload: JSON.stringify({ body: JSON.stringify({ dummy: 'data' })})
    }))
  }))
}));

describe('invoke', () => {

  it('calls the right thing and resolves into a parsed data', async () => {
    const result = await invoke({
      functionName: 'blah',
      payload: { some: 'data' }
    })

    expect(result).toEqual({ dummy: 'data' });
  })
})
