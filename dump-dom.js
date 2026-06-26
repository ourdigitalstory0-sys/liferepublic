import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    const dom = await page.evaluate(() => document.documentElement.outerHTML);
    console.log(dom.substring(0, 5000)); // Print first 5000 chars of DOM
    await browser.close();
})();
