const AccountController = require("../controller/AccountController");
const User = require("../model/user");

describe("TestMock", () => {

  const mockedData = {
    item: "Hello"
  };

  let findByIdAndUpdate
  beforeAll(() => {
    findByIdAndUpdate = jest.spyOn(User, 'findByIdAndUpdate');
    findByIdAndUpdate.mockReturnValue(mockedData);
  });
  

  it("Post Add balance",  async () => {
    const response = await AccountController.pushBalanceData("test", "test");
    console.log(response)
    
  });

});
