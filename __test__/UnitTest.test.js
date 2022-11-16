const AccountController = require("../controller/AccountController")

it('should get 2', () => {
  const result = AccountController.plus(1,2)

  // Assertion
  expect(result).toEqual(3)
})

it('Push data to account', () => {
  console.log("Hello")
  // Assertion
  
})