const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:8000/login'); //Get the login page
    await driver.findElement(By.name('username')).sendKeys('test').then(console.log("Enter username"));
    await driver.findElement(By.name('psw')).sendKeys('asd').then(console.log("Enter password"));
    await driver.findElement(By.name('loginBtn')).click().then(console.log("Press Login Button")); //Tried to login
    await driver.wait(until.titleIs('Dashboard Page'), 30000).then(console.log("Suscessfully Login To system")); //Successfully login into system
    await driver.sleep(3000) //Wait 3 second for user to see the dashboard page
    await driver.findElement(By.name('Description')).sendKeys('Added By Automated Test').then(console.log("Enter Description")); //Input the income Description
    await driver.findElement(By.name('Balance')).sendKeys(555, Key.ENTER).then(console.log("Enter Balance")); //Enter Balance and Press the button
  } finally {
    await driver.quit();
  }
})();