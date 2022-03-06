/// <reference types="Cypress" />

const baseUrl = Cypress.config("baseUrl");

describe("GET Reqres Lista Usuarios Primeira Pagina", () => {
    it("GET Primeira Pagina", () => {
        cy.request('GET', '/?page=1').as("getListFirtPageUsersRequest")
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.data[0].first_name).equal('George')
                expect(response.body).to.not.be.null
                expect(response.body.data).to.have.length(6)
        })
    })
}) 

describe("GET Reqres Usuario", () => {
    it("GET Usuario", () => {
        cy.request('GET', '/2').as("getUserRequest")
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.data.id).equal(2)
                expect(response.body.data.first_name).equal('Janet')
                expect(response.body).to.not.be.null
        })
    })
})

describe("GET Reqres Lista Usuarios", () => {
    it("GET Lista Usuarios", () => {
        cy.request('GET', '/?page=2').as("getListUsersRequest")
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.page).equal(2)
                expect(response.body.data[2].first_name).equal('Tobias')
                expect(response.body).to.not.be.null
            })
    })
})

describe("POST Reqres Users", () => {
    it("POST Criar Usuario", () => {
        var usuario = {
            "name": "Arthur",
            "job": "QA"
        }

        cy.request('POST', '/', usuario).as("postUserRequest")
            .then((response) => {
                expect(response.status).equal(201)
                expect(response.body.name).equal(usuario.name)
                expect(response.body.job).equal(usuario.job)
                expect(response.body).to.not.be.null
            })
        cy.request('POST', '/users', usuario)
            .its('body')
            .should('include', {name:'Arthur'})
    })
})

describe("PUT Reqres Users", () => {
    it("PUT Update Usuario", () => {
        var usuario1 = {
            "name": "Arthur Henrique",
            "job": "Quality Assurance"
        }

        cy.request('PUT', '/2', usuario1).as("putUserRequest")
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.name).equal(usuario1.name)
                expect(response.body.job).equal(usuario1.job)
                expect(response.body).to.not.be.null
            })
    })

})

describe ("PATCH Reqres Users", () => {
    it("PATCH Alterar Usuario", () => {
        var usuario2 = {
            "name": "Arthur Henrique Dias da Silva",
            "job": "Software Test Engineer"
        }

        cy.request('PATCH', '/3', usuario2).as("patchUserRequest")
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.name).equal(usuario2.name)
                expect(response.body.job).equal(usuario2.job)
                expect(response.body).to.not.be.null
            })
    })

})

describe("DELETE Reqres Users", () => {
    it("DELETE Usuario", () => {
        var usuario = {
            "name": "Arthur",
            "job": "QA"
        }

        cy.request('DELETE', '/2').as("deleteUserRequest")
            .then((response) => {
                expect(response.status).equal(204)
                expect(response.body).equal('')
            })
    })

})
