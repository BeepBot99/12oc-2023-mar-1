const puppeteer = require("puppeteer");
const startingURL = "https://pdastats.com";
const nthURL = 3;

const iterations = 1;
(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(startingURL);

    // Wait and click on first result
    const searchResultSelector = `a:nth-child(${nthURL})`;
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Print the full title
    console.log(await page.url());

    await browser.close();
})();
