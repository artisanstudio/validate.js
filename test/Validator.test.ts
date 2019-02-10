import Validator from "../src/Validator"

/**
 * Dummy test
 */
describe("Validator", () => {
  it("expands a rule set string to an array", () => {
    const aboveEighteenYearsOld = (age : number) => age >= 18

    const validator = new Validator({
      name: "required",
      email: "required|email",
      password: ["requried", "min:8"],
      age: aboveEighteenYearsOld,
    })

    expect(validator.getRules()).toEqual({
      name: ["required"],
      email: ["required", "email"],
      password: ["requried", "min:8"],
      age: [aboveEighteenYearsOld],
    })
  })
})
