import fetch from 'node-fetch'
import { handler } from './breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler', () => {
  const mockPayload = {
    message: {
      test: [],
      bulldog: ['boston', 'english', 'french'],
      corgi: ['pembroke'],
    },
  }
  const mockResponseObject = [
    'test',
    'boston bulldog',
    'english bulldog',
    'french bulldog',
    'pembroke corgi',
  ]

  const mockTimeoutObject = {
    statusCode: 408,
    body: 'Request was aborted after a timeout',
  }

  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({ body: mockResponseObject })
  })

  it('handles gracefully given an external call timeout', async () => {
    try {
      await handler()
    } catch (e) {
      expect(e).toMatchObject(mockTimeoutObject)
    }
  })
})
