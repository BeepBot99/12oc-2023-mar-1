// WARNING
// ----------
// The following code is a solution to the Twelve of Code March, 2023, Challenge 1.
// Viewing it will spoil the answer to the challenge.
// Read ahead at your own risk.
// ----------

const puppeteer = require("puppeteer");
const startingURL = "https://thethriftypennies.blogspot.com/";
const nthLastURL = 5;
const iterations = 10;
async function run() {
    let currentURL = startingURL;
    for (let i = 0; i < iterations; i++) {
        console.log(currentURL, `Iteration ${i}/${iterations}`);
        currentURL = await evaluateURL(currentURL, nthLastURL);
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(currentURL);
    currentURL = page.url();
    await browser.close();
    console.log(currentURL, "Done");
}
async function evaluateURL(urlToEvaluate, n) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let href;
    await page.goto(urlToEvaluate);
    if (
        await page.evaluate(
            `document.getElementsByTagName("a")[document.getElementsByTagName("a").length-${n}].hasAttribute("href")`
        )
    ) {
        href = await page.evaluate(
            `document.getElementsByTagName("a")[document.getElementsByTagName("a").length-${n}].getAttribute("href")`
        );
        if (href.indexOf("http") !== 0) {
            href = await evaluateURL(urlToEvaluate, n + 1);
        }
    } else {
        href = await evaluateURL(urlToEvaluate, n + 1);
    }

    await browser.close();
    return href;
}
run();
