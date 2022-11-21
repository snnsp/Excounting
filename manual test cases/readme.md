# Manual Test
## Case 1 Login to the system
    Test Scenario ID: Login-1
    Test Case ID: Login-1A
    Test Case Description: Login positive test case
    Test Priority: High
    Pre-Requisite: A valid user account.
    Post-Requisite: A system must redirect the user to dashboard

| S.No | Action | Inputs  | Expected Output | Actual Output        | Test Browser        | Test Result  | Test Comments
| -----|:-------------:| -----:  | -----:| ------------- |:-------------:| -----:  | -----:|
| 1    | Launch web application | - | Get the login page | Get the login page | Google Chrome | Pass | -
| 2    | Enter Valid username and Valid password| username: test password: asd | Fill in the login form | Fill in the login form | Google Chrome | Pass | -
| 3    | Click on Login Button| - | Redirect to dashboard | Redirect to dashboard | Google Chrome | Pass | Get the dashboard without any error

## Case 2 Retrive the monthly report
    Test Scenario ID: MR-1
    Test Case ID: MR-1A
    Test Case Description: Retrive the monthly report of the user
    Test Priority: High
    Pre-Requisite: A user must login to our system.
    Post-Requisite: A user will see the monthly report summary.

| S.No | Action | Inputs  | Expected Output | Actual Output        | Test Browser        | Test Result  | Test Comments
| -----|:-------------:| -----:  | -----:| ------------- |:-------------:| -----:  | -----:|
| 1    | Click on dashboard on the nav bar | - | Get the dashboard page | Get the dashboard page | Google Chrome | Pass | -
| 2    | Click on Get Monthly Report button| - | Get the Monthly Report | Get the Monthly Report | Google Chrome | Pass | User will get the monthly report that summarize the income/expense in the month.

## Case 3 Add new Income to the system
    Test Scenario ID: Income-1
    Test Case ID: Income-1A
    Test Case Description: Add the income data to the system
    Test Priority: High
    Pre-Requisite: A user must login to our system.
    Post-Requisite: The income information will saved in database and display the result to the user.

| S.No | Action | Inputs  | Expected Output | Actual Output        | Test Browser        | Test Result  | Test Comments
| -----|:-------------:| -----:  | -----:| ------------- |:-------------:| -----:  | -----:|
| 1    | Click on dashboard on the nav bar | - | Get the dashboard page | Get the dashboard page | Google Chrome | Pass | -
| 2    | Enter the input to the description box | Added By Automated Test | Fill the description text box | Fill the description text box | Google Chrome | Pass | -
| 3    | Enter the input to the balance box | 555 | Fill the balance input box | Fill the balance input box | Google Chrome | Pass | -
| 4    | Click on Add Balance button | - | The balance was push to database | The balance was push to database | Google Chrome | Pass | The balance was push to database and user will see in dashboard.

## Requirement Traceability Matrix

| Req No | Req Description              | TestCase ID  | Status
| -------|:----------------------------:| -----:       |-----:|
| 1      | Login to the system          | Login-1A     | Pass
| 2      | Retrive the monthly report   | MR-1A        | Pass
| 3      | Add new Income to the system | Income-1A    | Pass
