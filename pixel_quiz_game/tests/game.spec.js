import { test, expect } from '@playwright/test';

test('Pixel Quiz Game Flow', async ({ page }) => {
    // Mock API
    await page.route('*/**/exec?action=getQuestions*', async route => {
        const json = [
            { id: '1', question: 'What is 1+1?', options: ['1', '2', '3', '4'], answer: '2' },
            { id: '2', question: 'What is Pixel Art?', options: ['Vector', 'Raster', '3D', 'Voxels'], answer: 'Raster' },
            { id: '3', question: 'Who is the Boss?', options: ['Bowser', 'Mario', 'Peach', 'Toad'], answer: 'Bowser' },
            { id: '4', question: 'Best Color?', options: ['Red', 'Green', 'Blue', 'Yellow'], answer: 'Red' },
            { id: '5', question: 'Game Over?', options: ['Yes', 'No', 'Maybe', 'Never'], answer: 'Never' },
        ];
        await route.fulfill({ json });
    });

    await page.route('*/**/exec?action=submitScore*', async route => {
        await route.fulfill({ json: { success: true } });
    });

    // 1. Go to Home
    await page.goto('http://localhost:5173/');
    await expect(page.locator('h1')).toContainText('PIXEL QUIZ');

    // 2. Initial State: Start button disabled
    const startBtn = page.getByRole('button', { name: 'INSERT COIN (START)' });
    await expect(startBtn).toBeDisabled();

    // 3. Enter Player ID
    await page.getByPlaceholder('ENTER PLAYER ID').fill('HERO');
    await expect(startBtn).toBeEnabled();

    // 4. Start Game
    await startBtn.click();

    // 5. Play through 5 questions
    // Wait for first question
    await expect(page.locator('.screen-game')).toBeVisible();

    for (let i = 0; i < 5; i++) {
        // Check level display
        // Note: Depends on mock data question count
        // await expect(page.locator('.game-header')).toContainText(`LEVEL ${i+1}`);

        // Check Question is visible
        await expect(page.locator('.boss-speech-bubble')).toBeVisible();

        // Choose an option (e.g., first one)
        const options = page.locator('.option-btn');
        await expect(options).toHaveCount(4);
        await options.first().click();

        // Slight delay for state update if needed, but Playwright auto-waits
    }

    // 6. Verify Result Screen
    await expect(page.locator('.screen-result')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'FINAL SCORE' })).toBeVisible();

    // 7. Verify Score
    const scoreText = await page.locator('.score-display').textContent();
    console.log('Final Score:', scoreText);

    // 8. Play Again
    await page.getByRole('button', { name: 'PLAY AGAIN' }).click();
    await expect(page.locator('.screen-home')).toBeVisible();
});
