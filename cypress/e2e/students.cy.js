import students from '../fixtures/students.json'
import studentsPage from '../support/pages/StudentsPage'


describe('Tela de Estudantes', () => {
    beforeEach(() => {
        cy.loginAsAdmin()
    })

    it('Deve ser possível cadastrar um novo aluno', () => {
        const STUDENT = students.create

        cy.task('deleteStudent', STUDENT.email)

        studentsPage.gotoRegisterPage()
        studentsPage.fillForm(STUDENT)
        studentsPage.submitForm()

        studentsPage.popup.haveText('Dados cadastrados com sucesso.')
    })

    it('Não deve ser possível cadastrar aluno com email duplicado', () => {

        const STUDENT = students.duplicate

        cy.task('resetStudent', STUDENT)

        studentsPage.gotoRegisterPage()
        studentsPage.fillForm(STUDENT)
        studentsPage.submitForm()

        studentsPage.popup.haveText('O email informado já foi cadastrado!')

    })

    it('Deve ser possível remover um aluno sem matrícula', () => {

        const STUDENT = students.remove

        cy.task('resetStudent', STUDENT)

        studentsPage.searchStudent(STUDENT.name)
        studentsPage.removeActionButton(STUDENT.email)

        studentsPage.popup.confirm()
        studentsPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it('Validação dos campos são obrigatórios - Cadastro de Aluno', () => {
        studentsPage.gotoRegisterPage()
        studentsPage.submitForm()

        const REQUIRED_FIELDS = [
            { fieldLabel: "Nome completo", expectedMessage: "Nome é obrigatório" },
            { fieldLabel: "E-mail", expectedMessage: "O email é obrigatório" },
            { fieldLabel: "Idade", expectedMessage: "A idade é obrigatória" },
            { fieldLabel: "Peso (em kg)", expectedMessage: "O peso é obrigatório" },
            { fieldLabel: "Altura", expectedMessage: "A altura é obrigatória" }
        ]

        const ERROR_RESULTS = []

        REQUIRED_FIELDS.forEach(
            FIELD => {
                studentsPage.fieldValidationMessage(FIELD.fieldLabel).invoke('text').then(
                    RETRIEVED_MESSAGE => {
                        if (FIELD.expectedMessage != RETRIEVED_MESSAGE) {
                            cy.log(`🔴 **FAIL**: campo ${FIELD.fieldLabel}\n
                                    ***expected***: ${FIELD.expectedMessage}\n
                                    ***received***: ${RETRIEVED_MESSAGE}`)

                            cy.screenshot(`test required fields - ${FIELD.fieldLabel}`)
                            ERROR_RESULTS.push(FIELD.fieldLabel)
                        } else {
                            cy.log(`🟢 **SUCCESS**: campo ${FIELD.fieldLabel}`)
                        }
                    }
                )
            }
        )

        cy.wrap(ERROR_RESULTS).should('be.empty')

    })

    /**
     * DESAFIO: Implementar a validação para os seguintes casos:
     * - Tentar cadastrar um aluno menor de 16 anos (deve passar)
     * - Tentar cadastrar informando peso incorreto (deve falhar)
     * - Tentar cadastrar informando altura incorreta (deve falhar)
    */


    //Implementação com as validações uma a uma
    it('Tentar cadastrar um aluno menor de 16 anos', () => {
        const STUDENT = students.invalid_age

        const EXPECTED_MESSAGE = 'A idade mínima para treinar é 16 anos!'

        cy.task('deleteStudent', STUDENT.email)

        studentsPage.gotoRegisterPage()

        studentsPage.fillForm(STUDENT)
        studentsPage.submitForm()

        studentsPage.fieldValidationMessage('Idade').should('have.text', EXPECTED_MESSAGE)
    })

    it('Tentar cadastrar informando peso incorreto', () => {
        const STUDENT = students.invalid_weight

        const EXPECTED_MESSAGE = 'O peso deve ser maior que 0'

        cy.task('deleteStudent', STUDENT.email)

        studentsPage.gotoRegisterPage()

        studentsPage.fillForm(STUDENT)
        studentsPage.submitForm()

        studentsPage.fieldValidationMessage('Peso (em kg)').should('have.text', EXPECTED_MESSAGE)
    })

    it('Tentar cadastrar informando altura incorreta', () => {
        const STUDENT = students.invalid_feet_tall

        const EXPECTED_MESSAGE = 'A altura deve ser maior que 0'

        cy.task('deleteStudent', STUDENT.email)

        studentsPage.gotoRegisterPage()

        studentsPage.fillForm(STUDENT)
        studentsPage.submitForm()

        studentsPage.fieldValidationMessage('Altura').should('have.text', EXPECTED_MESSAGE)
    })
})