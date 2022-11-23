const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:8000/login'); //Get the login page
    await driver.findElement(By.name('username')).sendKeys('test').then(console.log("Enter username"));
    await driver.findElement(By.name('psw')).sendKeys('asd').then(console.log("Enter password"));
    await driver.findElement(By.name('loginBtn')).click().then(console.log("Press Login Button"));
    await driver.wait(until.titleIs('Dashboard Page'), 30000).then(console.log("Suscessfully Login To system")); //Suscessfully login
    await driver.findElement(By.name('MonthlyReportBtn')).sendKeys(Key.ENTER).then(console.log("Click Month Report"));//Click on monthly report button
    await driver.sleep(5000) //Wait 5 Seconds for user to see the Monthly Report modal
  } finally {
    await driver.quit();
  }
})();