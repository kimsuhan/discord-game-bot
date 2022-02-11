import puppeteer, { Browser } from 'puppeteer';

declare global {
    var browser: Browser;
}

export default async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    globalThis.browser = browser;
}