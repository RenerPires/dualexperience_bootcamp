export class Navbar{

    isUserLoggedIn(name){
        cy.get('aside>div>.actions>.logged-user')
			.should('contain.text', `Olá, ${name}`)
    }

    gotoStudentsPage(){
        cy.get('a[href="/students"]').click()
    }

    gotoEnrollmentsPage(){
        cy.get('a[href="/enrollments"]').click()
    }
}