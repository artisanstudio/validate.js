/**
 * Ensure that the given value is wrapped with an array.
 *
 * If the given value is an array, well, there's nothing to do here!
 *
 * @param value
 */
export const arrayWrap = (value: any) => {
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

/**
 * Find and replace a colon-template string.
 *
 * Usage:
 *  patternReplace("The :attribute is required.", {
 *    attribute: "email"
 *  })
 *
 * @param string
 * @param replacements
 */
export const patternReplace = (string: string, replacements: object) => {
  Object.entries(replacements).forEach(([search, replacement]) => {
    string = string.replace(`:${search}`, replacement)
  })

  return string
}

/**
 * Taken from https://stackoverflow.com/questions/4244896/dynamically-access-object-property-using-variable
 *
 * @param object
 * @param path
 */
export const dataGet = (object: any, path: string) => {
  return path.split('.').reduce(function(prev: any, curr: any) {
    return prev ? prev[curr] : null
  }, object)
}
