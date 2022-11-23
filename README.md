# 2022-ITCS473-HolyFriends Project 2
## Team Members
1. 6288046	Eakdanai 	Sontichai
2. 6288043	Charan	Sirijaturontchai
3. 6288061	Chaiyasit	Apirakkitikul
4. 6288044	Non	Somboonsakdikul
5. 6288042	Parin 	Sewamontree
6. 6288193	Araya	Prateepthintong

## Project Overview
- **For** People
- **Who** want an easy way to manage their money digitally
- **Excounting** is a web-based personal accounting program
That allows user to easily manage their money
Unlike existing solutions that use local-base storage that has non-user friendly UI and
questionable security
- **Our product** will provide an easy-to-use account-base and secure money managing experience.

## ProEn Web Hosting 
    http://holyfriends.th1.proen.cloud/login

## About the Test 
Our group is working on 
1. Unit Testing
2. System Testing
3. Automated UI Testing
4. Bonus: CI Integration

### Unit Testing
- Our group use the JEST framework to test our project.
- All of the units test are in the folder __test__ in the file name UnitTest.test.js
- You can run the unit test by using command npm test

### System Testing
- The system testing is in the folder manual test cases you can visit and read the readme.md connect inside.

### Automated UI Testing
- Our group use the Selenium Chrome Webdriver for automated UI testing
- You can run this test by cd to the folder automated_test_cases then use the command node ... where ... is the file name of test

### Bonus: CI Integration
- The workflow is in the folder .github/workflows/node.js.yml
- When we push the code or create pull request to the repo the github action will automatically run all unit test.
