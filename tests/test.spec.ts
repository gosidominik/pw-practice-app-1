import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
})

test.describe('first suite', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Form layouts').click()
    })
    test('Click Eamil', async({page}) => {
        await page.getByRole('textbox', {name: 'Email'}).first().click()        
    })

    test('Locate child elements', async ({page}) => {
        await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()
    })
    
    test('Locate parent elements', async ({page}) => {
        await page.locator('nb-card', {hasText: 'Using the grid'}).getByRole('textbox',{name: 'Email'}).click()
        
        await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox',{name: 'Email'}).click()
        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
    })
        
    test('Reusing locators', async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
        const emailField = basicForm.getByRole('textbox',{name: 'Email'})
 
        await emailField.fill('test@test.com')
        await basicForm.getByRole('textbox',{name: 'Password'}).fill('Password123')
        await basicForm.locator('nb-checkbox').click()
        await basicForm.getByRole('button').click()

        await expect(emailField).toHaveValue('test@test.com')
    })

    test('Extracting values', async ({page}) => {
        //single text value
        const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
        const buttonText = await basicForm.locator('button').textContent()
        expect(buttonText).toEqual('Submit')

        //all text values
        const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
        expect(allRadioButtonsLabels).toContain('Option 1')

        //input value
        const emailField = basicForm.getByRole('textbox', {name: 'Email'})
        await emailField.fill('test@test.com')
        const emailValue = await emailField.inputValue()
        expect(emailValue).toEqual('test@test.com')

        const placeHolderValue = await emailField.getAttribute('placeholder')
        expect(placeHolderValue).toEqual('Email')
    })

    test('assertions', async({page}) => {
        const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')
        
        //general assertion
        const num = 5;
        expect(num).toEqual(5)

        const text = await basicFormButton.textContent()
        expect(text).toEqual('Submit')

        //locator assertion
        await expect(basicFormButton).toHaveText('Submit')

        //soft assertion
        await expect.soft(basicFormButton).toHaveText('Submit')
        await basicFormButton.click()
    })
});

test.describe('second suite', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Charts', {exact: true}).click()
    })
    test('Click Echart', async({page}) => {
        await page.getByText('Echarts', {exact: true}).click()        
    })
});
