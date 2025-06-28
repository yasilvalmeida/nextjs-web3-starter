import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is present
    await expect(page.locator('h1')).toHaveText('Next.js Web3 Starter');

    // Check if the description is present
    await expect(page.locator('p').first()).toContainText(
      'A modern Web3 application built with Next.js 15'
    );

    // Check if wallet connector is present
    await expect(page.locator('text=Connect Wallet')).toBeVisible();

    // Check if navigation cards are present
    await expect(page.locator('text=Check Token Balance')).toBeVisible();
    await expect(page.locator('text=Send Tokens')).toBeVisible();
  });

  test('should show wallet connection options', async ({ page }) => {
    await page.goto('/');

    // Check if MetaMask button is visible
    await expect(page.getByRole('button', { name: /MetaMask/i })).toBeVisible();

    // Check if WalletConnect button is visible
    await expect(
      page.getByRole('button', { name: /WalletConnect/i })
    ).toBeVisible();
  });

  test('should navigate to balance page', async ({ page }) => {
    await page.goto('/');

    // Click on the balance card using a more specific selector
    await page.getByRole('link', { name: /Check Token Balance/i }).click();

    // Check if we're on the balance page
    await expect(page).toHaveURL('/balance');
    // The page shows "Wallet Not Connected" when no wallet is connected
    await expect(page.locator('h2')).toHaveText('Wallet Not Connected');
  });

  test('should navigate to transfer page', async ({ page }) => {
    await page.goto('/');

    // Click on the transfer card using a more specific selector
    await page.getByRole('link', { name: /Send Tokens/i }).click();

    // Check if we're on the transfer page
    await expect(page).toHaveURL('/transfer');
    // The page shows "Wallet Not Connected" when no wallet is connected
    await expect(page.locator('h2')).toHaveText('Wallet Not Connected');
  });
});
