import { Popup } from "./components/Popup"

class LoginPage {
    popup = new Popup()

    gotoPage() {
        cy.visit('http://localhost:3000/')
    }

    fillCredentials(credentials) {
        if(credentials.email)
            cy.get('input[placeholder="Seu email"')
              .clear()
              .type(credentials.email)
        
        if(credentials.password)
            cy.get('input[placeholder="Sua Senha"')
              .clear()
              .type(credentials.password)
    }

    submitForm() {
        cy.contains('button', 'Entrar').click()
    }

    doLogin(credentials) {
        this.gotoPage()
        this.fillCredentials(credentials)
        this.submitForm()
    }
}

export default new LoginPage()