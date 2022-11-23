const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:8000/login'); //Get the login page
    await driver.findElement(By.name('username')).sendKeys('test').then(console.log("Enter username")); //Enter Username
    await driver.findElement(By.name('psw')).sendKeys('asd').then(console.log("Enter password")); //Enter password
    await driver.sleep(3000); //Wait 3 second before click on login button
    await driver.findElement(By.name('loginBtn')).click().then(console.log("Press Login Button")); //Click on loggin button
    await driver.sleep(2000) //Wait 2 seconds for user to see the dashboard page
    await driver.wait(until.titleIs('Dashboard Page'), 30000).then(console.log("Suscessfully Login To system"));
  } finally {
    await driver.quit();
  }
})();