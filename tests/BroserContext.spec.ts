 import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
 test('Multi-user scenario with BrowserContext', async () => {
// Launch one browser instance
 let browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' }); 
// Create two separate contexts (like incognito windows) 
 let context1: BrowserContext = await browser.newContext();
// Admin session 
let context2: BrowserContext = await browser.newContext(); 
// Customer session 
// Create pages for each context 
let page1: Page = await context1.newPage(); 
let page2: Page = await context2.newPage(); 
// --- User 1: Admin --- 
await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login'); 
await page1.locator('#input-email').fill('march2024@open.com'); 
await page1.locator('#input-password').fill('Selenium@12345');
await page1.locator('//input[@value="Login"]').click(); 
// Perform admin actions // --- User 2: Customer --- 
await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
await page2.locator('#input-email').fill('pwtest@play.com');
await page2.locator('#input-password').fill('test@123');
await page2.locator('//input[@value="Login"]').click(); 
// Verify customer actions 
// Close contexts 
await context1.close();
await context2.close(); 
// Close browser 
await browser.close(); }); 