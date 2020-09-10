describe('E2E Test - Login', () => {
    it('Login failure with invalid credentials', () => {
    
        browser.url('https://the-internet.herokuapp.com/login')
        $('#username').waitForExist()
        $('#username').setValue('invalidUser')
        $('#password').waitForExist()
        $('#password').setValue('invalidPass')
        $('button[type = "submit"]').click()
        $('.flash.error').waitForExist()
        //browser.saveScreenshot('./screenshots/theinternetapp_invalid_login_check.png')
    })
    
    it('Login success with valid credentials', () => {
        browser.url('https://the-internet.herokuapp.com/login')
        $('#username').waitForExist()
        $('#username').setValue('tomsmith')
        $('#password').waitForExist()
        $('#password').setValue('SuperSecretPassword!')
        $('button[type = "submit"]').click()
        $('.flash.success').waitForExist()
        //browser.saveScreenshot('./screenshots/theinternetapp_valid_login_check.png')
    })

    it('Logout from app', () => {
        $('.button.secondary.radius').waitForExist()
        $('.button.secondary.radius').click()
        const checkLoginPage = $('h2')
        //expect(checkLoginPage).toHaveText('Login Page')
        //browser.saveScreenshot('./screenshots/theinternetapp_logout_check.png')
    })
})