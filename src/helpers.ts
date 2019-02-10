export const arrayWrap = (value: any) => {
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

export const patternReplace = (string: string, replacements: object) => {
  Object.entries(replacements).forEach(([search, replacement]) => {
    string = string.replace(`:${search}`, replacement)
  })

  return string
}
