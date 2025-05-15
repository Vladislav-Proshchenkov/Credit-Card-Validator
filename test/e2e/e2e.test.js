const puppeteer = require('puppeteer');
const { startServer, stopServer } = require('../../server');

describe('Credit Card Validator E2E Tests', () => {
  let browser;
  let page;
  const PORT = 9001; 
  const BASE_URL = `http://localhost:${PORT}`;

  beforeAll(async () => {
    await startServer(PORT);
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      timeout: 60000
    });
    page = await browser.newPage();
  }, 60000);

  afterAll(async () => {
    try {
      await page?.close();
    } catch (e) {
      console.error('Page close error:', e);
    }
    
    try {
      await browser?.close();
    } catch (e) {
      console.error('Browser close error:', e);
    }
    
    try {
      await stopServer();
    } catch (e) {
      console.error('Server stop error:', e);
    }
  });

  test('should load the page', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    const title = await page.title();
    expect(title).toBe('Credit Card Validator');
  }, 30000);
});