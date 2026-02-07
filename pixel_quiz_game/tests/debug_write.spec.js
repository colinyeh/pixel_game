import { test, expect } from '@playwright/test';

test('Verify Backend Write: User 121-122', async ({ page }) => {
    test.setTimeout(120000);

    for (let i = 121; i <= 122; i++) {
        const userId = i.toString();
        console.log(`\n--- Testing Write for User: ${userId} ---`);

        try {
            await page.goto('http://localhost:5173/');
            await expect(page.locator('h1')).toContainText('PIXEL QUIZ');

            await page.getByPlaceholder('ENTER PLAYER ID').fill(userId);
            const startBtn = page.getByRole('button', { name: 'INSERT COIN (START)' });
            await expect(startBtn).toBeEnabled();

            await startBtn.click();
            await expect(page.locator('.screen-game')).toBeVisible({ timeout: 15000 });

            for (let q = 0; q < 5; q++) {
                await expect(page.locator('.boss-speech-bubble')).toBeVisible({ timeout: 5000 });
                const options = page.locator('.option-btn');
                await options.first().click();
                await page.waitForTimeout(500);
            }

            // Wait for result and capture console logs for GAS response
            const [response] = await Promise.all([
                page.waitForEvent('console', msg => msg.text().includes('GAS Response')),
                expect(page.locator('.screen-result')).toBeVisible({ timeout: 20000 })
            ]);

            console.log(`Success: ${response.text()}`);

        } catch (e) {
            console.error(`Failed for user ${userId}:`, e);
            throw e;
        }
    }
});
