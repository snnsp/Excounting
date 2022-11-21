const AccountController = require("../controller/AccountController");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

describe("Test pushBalanceData Function ", () => {

  const mockedBalanceData = {
    _id: "63463d1d6075ebcedd93898e",
    firstname: 'Mocked',
    lastname: 'ForTesting',
    username: 'Test',
    password: 'HashedPassword',
    Balance: [
      {
        Description: 'Mocked by PushBalance function',
        Amount: 500,
        Type: 'Expense',
        createdDate: '2022-11-06T07:38:17.910Z',
      }
    ]
  };

  beforeAll(() => {
    findByIdAndUpdate = jest.spyOn(User, 'findByIdAndUpdate');
    findByIdAndUpdate.mockReturnValue(mockedBalanceData);
  });


  it("Push Balance Data", async () => {

    expected = {
      _id: '63463d1d6075ebcedd93898e',
      firstname: 'Mocked',
      lastname: 'ForTesting',
      username: 'Test',
      password: 'HashedPassword',
      Balance: [
        {
          Description: 'Mocked by PushBalance function',
          Amount: 500,
          Type: 'Expense',
          createdDate: '2022-11-06T07:38:17.910Z'
        }
      ]
    }

    const response = await AccountController.pushBalanceData("MockedUserID", {
      Balance: {
        Description: 'Mocked by PushBalance function',
        Amount: 500,
        Type: 'Expense',
        createdDate: '2022-11-06T07:38:17.910Z',
      }
    });
    expect(response).toEqual(expected)
    expect(findByIdAndUpdate).toBeCalled();
  });
});

describe("Test Decoded Method ", () => {

  const mockedUserToken = {
    user_id: '63463d1d6075ebcedd93898e',
    username: 'test',
  }

  beforeAll(() => {
    verify = jest.spyOn(jwt, 'verify');
    verify.mockReturnValue(mockedUserToken)
  });

  it("Decoded ", async () => {
    const expected = {
      user_id: '63463d1d6075ebcedd93898e',
      username: 'test',
    }

    const response = await AccountController.decoded("someCookies")
    expect(response).toEqual(expected)
    expect(verify).toBeCalled()
  });
});

describe("Test postAddBalance Method ", () => {

  const mockRequest = {
    cookies: {
      access_token: "test"
    },
    body: {
      Balance: {
        Description: "Mocked Data",
        Amount: 500,
        Type: "Income",
        createdDate: Date.now(),
      }
    }
  };

  beforeAll(() => {
    res = {
      redirect: jest.fn()
    }
  });

  it("Post Add Balance ", async () => {
    const response = await AccountController.postAddBalance(mockRequest, res)
    expect(verify).toBeCalled()
    expect(findByIdAndUpdate).toBeCalled();
    expect(res.redirect).toBeCalled()
  });
});

