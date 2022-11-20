const AccountController = require("../controller/AccountController");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

describe("Test AccountController", () => {

  const mockedBalanceData = {
    item: "Hello"
  };

  const mockedUserToken = {
    user_id: '63463d1d6075ebcedd93898e',
    username: 'test',
  }

  const mockRequest = {
    cookies: {
      access_token: "test"
    },
    body:{
      Balance: {
        Description: "Mocked Data",
        Amount: 500,
        Type: "Income",
        createdDate: Date.now(),
      }
    }
  };

  let findByIdAndUpdate

  beforeAll(() => {
    findByIdAndUpdate = jest.spyOn(User, 'findByIdAndUpdate');
    findByIdAndUpdate.mockReturnValue(mockedBalanceData);

    verify = jest.spyOn(jwt, 'verify');
    verify.mockReturnValue(mockedUserToken)

    res = {
      redirect: jest.fn(),
    }

  });
  

  it("Push Balance Data",  async () => {
    const response = await AccountController.pushBalanceData("test", "test");
  });

  it("Post Add Balance ",  async () => {
    
    const response = await AccountController.postAddBalance(mockRequest,res)
    
  });


});
