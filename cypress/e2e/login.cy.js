import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentsPage'


describe('Autenticação - Tela de login', () => {

	it('Deve logar com o perfil do admin', () => {

		const ADMIN_CREDENTIALS = users.admin

		login.doLogin(ADMIN_CREDENTIALS)

		studentPage.navbar.isUserLoggedIn(ADMIN_CREDENTIALS.name)
	})

	it('Não deve logar com senha incorreta', () => {
		const INVALID_CREDENTIALS = users.invalid_user_credentials

		login.gotoPage()
		login.fillCredentials(INVALID_CREDENTIALS)
		login.submitForm()

		login.popup.haveText(`Suas credenciais são inválidas, por favor tente novamente!`)
	})

	it('Não deve logar com email não cadastrado', () => {
		const NOTFOUND_CREDENTIALS = users.not_found_user_credentials

		login.gotoPage()
		login.fillCredentials(NOTFOUND_CREDENTIALS)
		login.submitForm()

		login.popup.haveText(`Suas credenciais são inválidas, por favor tente novamente!`)
	})

	it('Não deve logar com email inválido', () => {
		const EXPECTED_RESULT = "Insira um email válido."
		const ERROR_RESULTS = []
		
		login.gotoPage()

		users.list_invalid_email_credentials.forEach(
			INVALID_CREDENTIALS => {
				login.fillCredentials(INVALID_CREDENTIALS)
				login.submitForm()
	
				login.popup.content().invoke('text').then(
					RECEIVED_TEXT => {
						if(RECEIVED_TEXT != EXPECTED_RESULT) {
							cy.log(`🔴 **FAIL** na variante ${INVALID_CREDENTIALS.category}\n
									Credenciais utilizadas:\n
									***Email***: ${INVALID_CREDENTIALS.email}\n
									***Password***: ${INVALID_CREDENTIALS.password}`)
							cy.screenshot(`invalid email - ${INVALID_CREDENTIALS.category}`)
							ERROR_RESULTS.push(INVALID_CREDENTIALS.category) 
						} else {
							cy.log(`🟢 **SUCCESS** na variante ${INVALID_CREDENTIALS.category}\n
									Credenciais utilizadas:\n
									***Email***: ${INVALID_CREDENTIALS.email}\n
									***Password***: ${INVALID_CREDENTIALS.password}`)
						}
					}
				)

				login.popup.goBack()
			}
		)

		cy.wrap(ERROR_RESULTS).should('be.empty')
	})

	it('Não deve logar com email em branco', () => {
		const EMPTY_EMAIL_CREDENTIALS = users.empty_email_credentials

		login.gotoPage()
		login.fillCredentials(EMPTY_EMAIL_CREDENTIALS)
		login.submitForm()

		login.popup.haveText(`Os campos email e senha são obrigatórios.`)
	})

	it('Não deve logar com senha em branco', () => {
		const EMPTY_PASSWORD_CREDENTIALS = users.empty_password_credentials

		login.gotoPage()
		login.fillCredentials(EMPTY_PASSWORD_CREDENTIALS)
		login.submitForm()

		login.popup.haveText(`Os campos email e senha são obrigatórios.`)
	})
})