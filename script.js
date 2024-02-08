// WARNING
// ----------
// The following code is a solution to the Twelve of Code March, 2023, Challenge 1.
// Viewing it will spoil the answer to the challenge.
// Read ahead at your own risk.
// ----------
//
//
//
//
//
//
//
//
//
//
//
//
// ----------

const STARTING_URL = "https://assdqjwjd.blogspot.com/";
const ITERATIONS = 10;

const puppeteer = require("puppeteer");
async function runProgram() {
    let currentURL = STARTING_URL;
    for (let i = 0; i < ITERATIONS; i++) {
        console.log(currentURL, `Iteration ${i}/${ITERATIONS}`);
        currentURL = await evaluateURL(currentURL, 1);
        if (!currentURL) {
            process.exit();
        }
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
    try {
        if (
            await page.evaluate(
                `document.getElementsByTagName("a")[document.getElementsByTagName("a").length-${n}].hasAttribute("href")`
            )
        ) {
            href = await page.evaluate(
                `document.getElementsByTagName("a")[document.getElementsByTagName("a").length-${n}].getAttribute("href")`
            );
            await browser.close();
            if (href.indexOf("http") !== 0) {
                href = await evaluateURL(urlToEvaluate, n + 1);
            }
        } else {
            await browser.close();
            href = await evaluateURL(urlToEvaluate, n + 1);
        }
    } catch (error) {
        if (error.name === "TypeError") {
            console.log("No anchor tags with URLs on that page!");
            return false;
        } else {
            console.log("Unkown error:\n", error);
            return false;
        }
    }

    return href;
}
runProgram();
