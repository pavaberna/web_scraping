import puppeteer from 'puppeteer';
import fs from 'fs';
import { parseStringPromise } from 'xml2js'; 

async function scrapeReviews() {

    const xmlData = fs.readFileSync('shark-product-0.xml', 'utf8');

    const result = await parseStringPromise(xmlData);

    const urls = result.urlset.url.map(item => item.loc[0]);

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    for (const url of urls) { 
        try {
            await page.goto(url);
            await page.waitForSelector('.js-product-title');
    
            const titles = await page.evaluate(() => {
                const titleNodes = document.querySelectorAll('.js-product-title');
                return Array.from(titleNodes).map(node => node.textContent.trim());
            });
    
          const cikkszam = titles.map(title => {
                const words = title.split(' ');
                return words[words.length - 1]; 
            });
    
            fs.appendFileSync('data.json', JSON.stringify({ url, cikkszam, termeknev: titles }, null, 2) + ',');
        } catch (error) {
            console.error(error);
            continue;
        }

    }

    await browser.close();
}

scrapeReviews();
