import {test, expect} from '@playwright/test';

test.describe('Successfully get images', () => {
    test('should return dog image when page is loaded', async ({page}) => {
        
        //await for api response
        const responsePromise = page.waitForResponse('**/api/dogs/random');
        
        // navigate to home page
        await page.goto('/');

        // wait for API call to finnish
        await responsePromise;

        // locate the image element
        const dogImage = page.locator('img');

        // check if Image has source value 
        const src = await dogImage.getAttribute('src');
        expect(src).toBeTruthy();

        // check if Source value starts with https://
        await expect(dogImage).toHaveAttribute('src', /^https:\/\//);

    });

    test('should return new dog image when button is clicked', async ({page}) => {
        //await for api response
        const responsePromise = page.waitForResponse('**/api/dogs/random');

        // navigate to home page
        await page.goto('/');
        
        // click the button to get new dog image
        await page.getByRole('button', {name: 'Get Another Dog'}).click();

        // wait for API call to finnish
        await responsePromise;

        // locate the image element
        const dogImage = page.locator('img');

        // check if Image has source value 
        const src = await dogImage.getAttribute('src');
        expect(src).toBeTruthy();

        // check if Source value starts with https://
        await expect(dogImage).toHaveAttribute('src', /^https:\/\//);
    });
});

test.describe('Error handling', () => {
    test('should show error message when API call fails', async ({page}) => {
        // await for API response
        await page.route('**/api/dogs/random', async(route) => {
            await route.abort();
        });

        // navigate to home page
        await page.goto('/');

        // Page has an element containing word error 
        const errorContainer = page.getByText(/error/i);

        // Element with error text is visible
        await expect(errorContainer).toBeVisible();
    });
});