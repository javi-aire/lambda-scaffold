interface DogObject {
  message: {}
}

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value)
}

export default function buildArray(dogs: DogObject): Array<string> {
  const list: Array<string> = []
  Object.entries(dogs.message).forEach(([dog, breeds]: [string, unknown]) => {
    if (isStringArray(breeds) && breeds.length) {
      breeds.forEach((breed: string) => {
        list.push(`${breed} ${dog}`)
      })
    } else {
      list.push(`${dog}`)
    }
  })
  return list
}
