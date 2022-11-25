require('chromedriver');

const { linkSync } = require('fs');
const { By } = require('selenium-webdriver');
let swd = require('selenium-webdriver');
let browser = new swd.Builder();
let tab = browser.forBrowser('chrome').build();

let { email, pass } = require('./credentials.json');

let tabToOpen = 
    tab.get('https://cliente.contmatic.com.br/login?utm_source=site-contmatic&utm_medium=menu&utm_campaign=site-contmatic');
tabToOpen
    .then(function() {
        let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000, // 10 segundos
        });
    return findTimeOutP;
    })
    .then(function() {
        let promiseUsernameBox =
            tab.findElement(swd.By.id('user-name'));
        return promiseUsernameBox;
    })
    .then(function(usernameBox) {
        let promiseFillUsername =
            usernameBox.sendKeys(email);
        return promiseFillUsername;
    })
    .then(function () {
        console.log(`Usuário inserido com sucesso!!!`);

        let promisePasswordBox =
            tab.findElement(swd.By.id('user-password'));
        return promisePasswordBox;
    })
    .then(function(passwordBox) {
        let promiseFillPassword = passwordBox.sendKeys(pass);
        return promiseFillPassword;
    })
    .then(function() {
        console.log(`Senha inserida com sucesso!!!`);

        let promiseSignInBtn = tab.findElement(swd.By.css('.btn.btn-blue.btn-login'));
        return promiseSignInBtn;
    })
    .then(function(signInBtn) {
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;
    })
    .then(function() {
        console.log('Logado com sucesso!!!');
    })
    .then(function() {
        let promiseDownloadBtn = tab.findElement(swd.By.linkText('Atualizações e downloads')).click();
        return promiseDownloadBtn;
    })
    .then(function() {
        console.log('Pagina de downloads encontrada');
        let i = 1;

        const JrPath = `/html/body/div[4]/div/div/div/div/div/table/tbody/tr[1]/td[2]/a[2]/button`;
        const G5Path = `/html/body/div[4]/div/div/div/div/div/table/tbody/tr[2]/td[2]/a[2]/button`;
        const  gesconPath = `/html/body/div[4]/div/div/div/div/div/table/tbody/tr[3]/td[2]/a[2]/button`;

        let JrDownload = tab.findElement(swd.By.xpath(JrPath)).click();
        let G5Download = tab.findElement(swd.By.xpath(G5Path)).click();
        let gesconDownload = tab.findElement(swd.By.xpath(gesconPath)).click();

        return JrDownload, G5Download, gesconDownload;

    })
    .catch(function(err) {
        console.error(`Error: ${err} ocorreu`);
    })