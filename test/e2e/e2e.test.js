const puppeteer = require('puppeteer');
const { startServer, stopServer } = require('../../server');

describe('Credit Card Validator', () => {
  let browser = null;
  let page = null;
  let server = null;
  const PORT = 9001;
  const BASE_URL = `http://localhost:${PORT}`;

  beforeAll(async () => {
    try {
      server = await startServer(PORT);
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 30000
      });
      page = await browser.newPage();
    } catch (error) {
      console.error('Setup failed:', error);
      throw error;
    }
  }, 60000);

  afterAll(async () => {
    const cleanup = async () => {
      if (page && !page.isClosed()) await page.close().catch(console.error);
      if (browser) await browser.close().catch(console.error);
      if (server) await stopServer().catch(console.error);
    };
    await cleanup();
  });

  test('should load the page', async () => {
    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      const title = await page.title();
      expect(title).toBe('Credit Card Validator');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }, 30000);
});