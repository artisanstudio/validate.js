export default class Required {
  passes(attribute: string, value: any) {
    return value !== undefined && value !== null && value !== ''
  }
}
