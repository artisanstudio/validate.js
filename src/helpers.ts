import Validator from './Validator'

export const arrayWrap = (value: any) => {
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}
