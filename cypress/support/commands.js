// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// -- MY CUSTOM COMMANDS
import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentsPage'

Cypress.Commands.add('loginAsAdmin', () => {

    const ADMIN_CREDENTIALS = users.admin
    loginPage.doLogin(ADMIN_CREDENTIALS)

    studentPage.navbar.isUserLoggedIn(ADMIN_CREDENTIALS.name)
})