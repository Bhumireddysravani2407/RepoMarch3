import test from '@playwright/test';

test('getByRole examples', ({ page }) => {
// Find button by role
 page.getByRole('button').click();
// Find specific button by name (visible text)
 page.getByRole('button', { name: 'Login' }).click();
// Find link
 page.getByRole('link', { name: 'Forgot Password?' }).click();
// Find textbox (input)
 page.getByRole('textbox', { name: 'Email'
}).fill('test@test.com');
// Common roles: button, link, textbox, checkbox, radio, heading
 page.getByRole('heading', { name: 'Welcome' });
 page.getByRole('checkbox', { name: 'Remember me' }).check();
});