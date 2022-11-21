const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:8000/login');
    await driver.findElement(By.name('username')).sendKeys('test').then(console.log("Enter username"));
    await driver.findElement(By.name('psw')).sendKeys('asd').then(console.log("Enter password"));
    await driver.findElement(By.name('loginBtn')).click().then(console.log("Press Login Button"));
    await driver.wait(until.titleIs('Dashboard Page'), 30000).then(console.log("Suscessfully Login To system"));
  } finally {
    await driver.quit();
  }
})();