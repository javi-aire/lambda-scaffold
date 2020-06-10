import fetch from 'node-fetch'
import AbortController from 'abort-controller'

// Tried handling timeout here but may occur intermittently
export default async function fetchWithTimeout(url: string, timeout?: number): Promise<any> {
  const FETCH_TIMEOUT: number = timeout || 5000
  const controller = new AbortController()
  let result: object = {}

  try {
    const response = await fetch(url, { timeout: FETCH_TIMEOUT, signal: controller.signal })
    result = await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      result = {
        statusCode: 408,
        body: 'Request was aborted after a timeout',
      }
    }
  }

  return Promise.resolve(result)
}
