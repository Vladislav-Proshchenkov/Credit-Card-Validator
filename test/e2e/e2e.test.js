const puppeteer = require('puppeteer');
const { startServer, stopServer } = require('../../server');

describe('Credit Card Validator', () => {
  let browser;
  let page;
  let server;
  const PORT = 9001;
  const BASE_URL = `http://localhost:${PORT}`;

  beforeAll(async () => {
    server = await startServer(PORT);
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  }, 30000);

  afterAll(async () => {
    await page.close();
    await browser.close();
    await stopServer();
  });

  test('should load the page', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    const title = await page.title();
    expect(title).toBe('Credit Card Validator');
  }, 10000);
});