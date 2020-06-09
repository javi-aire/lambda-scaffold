import { Response } from './types'
import fetchWithTimeout from '../utils/fetchWithTimeout'
import buildArray from '../utils/buildArray'

interface BreedsResponse extends Response {
  body: string[]
}

export async function handler(): Promise<BreedsResponse> {
  const res = await fetchWithTimeout('https://dog.ceo/api/breeds/list/all', 3000)
  const doggos: string[] = buildArray(res)

  return {
    statusCode: 200,
    body: doggos,
  }
}
