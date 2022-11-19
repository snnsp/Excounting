const AccountController = require("../controller/AccountController");
const User = require("../model/user");

describe("TestMock", () => {

  const mockedBalanceData = {
    item: "Hello"
  };

  const mockedUserToken = {
    user_id: '63463d1d6075ebcedd93898e',
    username: 'test',
  }

  let findByIdAndUpdate

  beforeAll(() => {
    findByIdAndUpdate = jest.spyOn(User, 'findByIdAndUpdate');
    findByIdAndUpdate.mockReturnValue(mockedBalanceData);

    decoded = jest.spyOn(AccountController, 'decoded');
    decoded.mockReturnValue(mockedUserToken)

  });

  afterEach(() => {
    findByIdAndUpdate.mockRestore()
  });
  

  it("Push Balance Data",  async () => {
    const response = await AccountController.pushBalanceData("test", "test");
    console.log(response)
    
  });

  it("Post Add Balance ",  async () => {
    const response = await AccountController.postAddBalance()
    console.log(response)
    
  });


});
