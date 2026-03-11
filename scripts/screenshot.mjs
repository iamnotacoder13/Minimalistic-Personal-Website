import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const BASE_URL = 'http://localhost:5173';

// Add routes/pages you want to screenshot here
const PAGES = [
  { name: 'home', path: '/' },
  // { name: 'about', path: '/about' },
];

const OUTPUT_DIR = './screenshots';

function startDevServer() {
  const server = spawn('npx', ['vite'], { stdio: 'pipe', shell: true });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Dev server timed out')), 30000);

    server.stdout.on('data', (data) => {
      if (data.toString().includes('localhost:5173')) {
        clearTimeout(timeout);
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('localhost:5173')) {
        clearTimeout(timeout);
        resolve(server);
      }
    });

    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// Scroll through the page so Framer Motion whileInView animations trigger
async function scrollPageToRevealAnimations(page) {
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 500; // smaller steps for more reliable IntersectionObserver triggers
  let scrollY = 0;

  while (scrollY < pageHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 350)); // longer pause per step
    scrollY += step;
  }

  // Scroll back to top and wait for all animations to fully settle
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 2500));
}

async function takeScreenshots() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  console.log('Starting dev server...');
  const server = await startDevServer();
  console.log('Dev server ready.');

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    for (const { name, path: pagePath } of PAGES) {
      const url = `${BASE_URL}${pagePath}`;
      console.log(`Screenshotting ${url}...`);

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise(r => setTimeout(r, 2000)); // let React render
      await scrollPageToRevealAnimations(page);

      const filename = path.join(OUTPUT_DIR, `${name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`  Saved: ${filename}`);
    }
  } finally {
    if (browser) await browser.close();
    server.kill();
    console.log('Done.');
  }
}

takeScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
