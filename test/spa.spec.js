import puppeteer from "puppeteer";
import devices from "puppeteer/DeviceDescriptors";

const iPhone = devices["iPhone 6"];

describe("Output HTML", function() {
  this.timeout(0);
  it("Mobile", function(done) {
    puppeteer.launch().then(async browser => {
      const page = await browser.newPage();
      await page.emulate(iPhone);
      await page.goto("https://vaithuhay.com/");
      await page.waitForSelector("main#main");
      const html = await page.$eval("div#app", e => e.innerHTML);
      console.log(html);
      await browser.close();
      done();
    });
  });
});
