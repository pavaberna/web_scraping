import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeReviews() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://sharkclean.co.uk/shark-catalog/shark-cordless-vacuum-cleaners/');

    await page.waitForSelector('.product-description');

    const titles = await page.evaluate(() => {
        const titleNodes = document.querySelectorAll('.product-description');
        return Array.from(titleNodes).map(node => node.textContent.trim());
    });

    fs.writeFileSync('data.json', JSON.stringify(titles, null, 2));

    await browser.close();
}

scrapeReviews();
