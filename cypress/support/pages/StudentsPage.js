import { Navbar } from './components/Navbar'
import { Popup } from './components/Popup'

class StudentsPage {
    popup = new Popup()
    navbar = new Navbar()

    gotoRegisterPage() {
        cy.get('a[href="/students/new"]').click()
    }

    fillForm(student) {
        if (student.name) cy.get('input[name=name]').clear().type(student.name)
        if (student.email) cy.get('input[name=email]').clear().type(student.email)
        if (student.age) cy.get('input[name=age]').clear().type(student.age)
        if (student.weight) cy.get('input[name=weight]').clear().type(student.weight)
        if (student.feet_tall) cy.get('input[name=feet_tall]').clear().type(student.feet_tall)
    }

    submitForm() {
        cy.contains('button', 'Cadastrar').click()
    }

    fieldValidationMessage(fieldLabel) {
        return cy.contains('label', fieldLabel)
            .parent()
            .find('span')
    }

    searchStudent(name) {
        cy.get('input[placeholder="Buscar por nome"]').type(name)
    }

    removeActionButton(email) {
        cy.contains('tr', email, { timeout: 10000 })
            .find('button')
            .click()
    }

    editActionButton(email) {
        cy.contains('tr', email, { timeout: 10000 })
            .find('a[href="/students/1/edit"]')
            .click()
    }
}

export default new StudentsPage()