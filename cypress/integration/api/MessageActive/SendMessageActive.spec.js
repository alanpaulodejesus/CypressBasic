/// <reference types="cypress" />
import * as DATA from '../../../fixtures/dataApi/factory/dataUtils';

context('Send Message Whatsapp Active', () => {

  const UUID = DATA.guid
  const CELLPHONE = DATA.getNumber

  it('Send Message Active and debit wallet', () => {

    cy.getWallet()
      .then(response => {
        expect(response).property('status').to.equal(200)
        expect(response.body.resource).to.not.be.empty
        const walletFirstValue = response.body.resource.balance

        cy.getWalletTransaction(UUID)
          .then(response => {
            const walletTransactionFirstValue = response.body.resource.total

            cy.sendMessageWhatsApp(UUID, CELLPHONE)
              .then(response => {
                expect(response).property('status').to.equal(202)

                cy.wait(6000)
                cy.getWalletTransaction(UUID)
                  .then(response => {

                    expect(response).property('status').to.equal(200)
                    expect(response.body).to.not.be.empty
                    expect(response.body.resource).to.have.keys('total', 'itemType', 'items')
                    expect(response.body.resource.items[0]).to.have.keys('ownerIdentity', 'id', 'date', 'walletId', 'description', 'type', 'productId', 'value', 'extras')
                    expect(response).property('body').to.contain({
                      "id": UUID,
                      "status": "success"
                    })
                    expect(response.body.resource.items[0]).to.contain({
                      "type": "debit",
                      "value": 1
                    })
                    const valueDebitedInWalletTransaction = response.body.resource.items[0].value
                    const walletTransactionSecondValue = response.body.resource.total
                    expect(walletTransactionFirstValue + 1).to.eq(walletTransactionSecondValue)

                    cy.getWallet()
                      .then(response => {
                        expect(response).property('status').to.equal(200)
                        const newValueWalletAfterTransaction = walletFirstValue - valueDebitedInWalletTransaction
                        const NewWalletValue = response.body.resource.balance
                        expect(NewWalletValue).to.eq(newValueWalletAfterTransaction)
                      })
                  })
              })
          })
      })
  })
})