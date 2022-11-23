const AccountController = require("../controller/AccountController");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

/*
Unit Test 1 Test PushBalanceData Function
Using the graph coverage to this function we will get

  async function pushBalanceData(id, data) {
  const user = await User.findByIdAndUpdate(id, { $push:  data  }); --> 1
  return user --> 2
}
Test Requirement: [1,2]
Test Path: [1,2]
EPC satisfied by T1
Test case value = mockedBalanceData
Expected Output is expected variable below and findByIdAndUpdate function need to be called 
*/

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

/*
Unit Test 2 Test Decoded Function
Using the graph coverage to this function we will get

function decoded(token){
  return jwt.verify(token, config.TOKEN_KEY); --> 1
}

Test Requirement: [1]
Test Path: [1]
EPC satisfied by T1
Test case value = mockedUserToken
Expected Output is expected variable below and verify function has to be called
*/
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

/*
Unit Test 3 Test postAddBalance API
Using the graph coverage to this function we will get

postAddBalance: async (req, res) => {
    req.user = decoded(req.cookies.access_token); --> 1
    await pushBalanceData(req.user.user_id, { --> 2
      Balance: {
        Description: req.body.Description,
        Amount: req.body.Balance,
        Type: req.body.Type,
        createdDate: Date.now(),
      },
    });
    res.redirect("/dashboard"); --> 3
  }

Test Requirement: [1,2,3]
Test Path: [1,2,3]
EPC satisfied by T1
Test case value = (mockRequest,res)
Expected Output is expected variable below and findByIdAndUpdate,verify,res.redirect function must be called
*/
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

