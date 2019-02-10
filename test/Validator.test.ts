import Validator from "../src/Validator"

/**
 * Dummy test
 */
describe("Validator", () => {
  it("expands a rule set string to an array", () => {
    const validator = new Validator({
      name: "required",
      email: "required|email",
    })

    expect(validator.getRules()).toEqual({
      name: ["required"],
      email: ["required", "email"],
    })
  })
})
