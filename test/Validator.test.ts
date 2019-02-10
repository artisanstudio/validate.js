import Validator from "../src/Validator"

class CustomExtension {
}

describe("Validator", () => {
  beforeEach(() => {
    Validator.extend("custom", CustomExtension)
  })

  it("expands a rule set string to an array", () => {
    const aboveEighteenYearsOld = new class {
      passes (attribute: string, value: any) {
        return value >= 18
      }
    }

    const validator = new Validator({
      name: "custom",
      email: ["custom"],
      age: aboveEighteenYearsOld,
    })

    expect(validator.getRules()).toEqual({
      name: [new CustomExtension],
      email: [new CustomExtension],
      age: [aboveEighteenYearsOld],
    })
  })
})
