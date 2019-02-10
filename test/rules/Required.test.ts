import Required from "../../src/rules/Required"

describe("Validator", () => {
  it("returns false if the value is null or undefined", () => {
    const rule = new Required()

    expect(rule.passes('email', undefined)).toBe(false)
    expect(rule.passes('email', "")).toBe(false)
    expect(rule.passes('email', null)).toBe(false)
  })
})

