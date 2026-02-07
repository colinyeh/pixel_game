import { test, expect } from '@playwright/test';

test('Debug Simulation: User 101', async ({ page }) => {
    test.setTimeout(600000);

    console.log("DEBUG: Starting Simulation...");

    for (let i = 101; i <= 105; i++) {
        const userId = i.toString();
        console.log(`DEBUG: Simulate User: ${userId}`);

        try {
            await page.goto('http://localhost:5173/');
            await expect(page.locator('h1')).toContainText('PIXEL QUIZ');
            console.log(`DEBUG: User ${userId} - Home Loaded`);

            await page.getByPlaceholder('ENTER PLAYER ID').fill(userId);
            const startBtn = page.getByRole('button', { name: 'INSERT COIN (START)' });
            await expect(startBtn).toBeEnabled();
            console.log(`DEBUG: User ${userId} - ID Entered`);

            await startBtn.click();
            await expect(page.locator('.screen-game')).toBeVisible({ timeout: 15000 });
            console.log(`DEBUG: User ${userId} - Game Started`);

            for (let q = 0; q < 5; q++) {
                await expect(page.locator('.boss-speech-bubble')).toBeVisible({ timeout: 5000 });
                console.log(`DEBUG: User ${userId} - Question ${q + 1} Visible`);

                const options = page.locator('.option-btn');
                await expect(options).toHaveCount(4);

                const randomIdx = Math.floor(Math.random() * 4);
                await options.nth(randomIdx).click();

                await page.waitForTimeout(500);
            }

            await expect(page.locator('.screen-result')).toBeVisible({ timeout: 20000 });
            console.log(`DEBUG: User ${userId} - Result Visible`);

            await page.getByRole('button', { name: 'PLAY AGAIN' }).click();
            await expect(page.locator('.screen-home')).toBeVisible();
            console.log(`DEBUG: User ${userId} - Reset`);

        } catch (e) {
            console.error(`DEBUG: Error simulating user ${userId}:`, e);
        }
    }
    console.log("DEBUG: Simulation Completed.");
});
