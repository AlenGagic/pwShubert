

export class RegisterPage
{

    constructor(page)
    {

        this.page = page;
        this.emailField = page.getByPlaceholder('E-Mail');
        this.passwordField = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    signupAsNewUser = async (email, password) =>
    {

        await this.emailField.waitFor();

        await this.emailField.fill(email);

        await this.passwordField.waitFor();

        await this.passwordField.fill(password);

        await this.registerButton.waitFor();

        await this.registerButton.click();
    }
}