const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test('Login form is shown', async ({ page }) => {
        // Verificar que el título del formulario esté presente
        const titleLocator = await page.waitForSelector('h2');
        expect(await titleLocator.textContent()).toBe('Log in to application');

        // Verificar que los campos de entrada estén presentes
        const usernameInputLocator = await page.waitForSelector('input[name="username"]');
        const passwordInputLocator = await page.waitForSelector('input[name="password"]');
        expect(usernameInputLocator).toBeTruthy();
        expect(passwordInputLocator).toBeTruthy();

        // Verificar que el botón de enviar esté presente
        const submitButtonLocator = await page.waitForSelector('button[type="submit"]');
        expect(submitButtonLocator).toBeTruthy();
    });
}); 