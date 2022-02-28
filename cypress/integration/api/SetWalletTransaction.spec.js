/// <reference types="cypress" />
import { guid, toPostMasterBilling, urlBlipAi, typeTransaction } from '../../fixtures/dataApi/factory/dataUtils';
import * as METHOD from '../../fixtures/dataApi/method.json';
import * as ENDPOINTS from '../../fixtures/dataApi/endpoints.json';
import { headersWallet } from '../../fixtures/dataApi/headers';

context('Set Wallet Transaction', () => {
  it('Set a Credit', () => {
    cy.request({
      method: METHOD.POST,
      url: `${urlBlipAi }${ENDPOINTS.COMMANDS}`,
      headers: headersWallet,
      body: {
        "id": guid,
        "to": toPostMasterBilling,
        "method": METHOD.SET,
        "uri": `${ENDPOINTS.WALLETS}/${Cypress.env('wallet')}/transactions`,
        "type": typeTransaction,
        "resource": {
          "description": "Credit 1.50",
          "type": "credit",
          "value": 1.50
        }
      }
    }).then(response => {
      expect(response).property('status').to.equal(200),
        expect(response.body).to.not.be.empty,
        expect(response.body).to.have.keys('type', 'resource', 'method', 'status', 'id', 'from', 'to', 'metadata'),
        expect(response).property('body').to.contain({
          "status": "success",
          "type": typeTransaction
        }),
        expect(response.body.resource).to.not.be.empty,
        expect(response.body.resource).to.have.keys('ownerIdentity', 'id', 'date', 'walletId', 'description', 'type', 'value'),
        expect(response).property('body').property('resource').to.contain({
          "walletId": decodeURIComponent(`${Cypress.env('wallet')}`),
          "type": "credit",
          "description": "Credit 1.50",
          "value": 1.50,
        })
    })
  })

  it('Set a Debit', () => {
    cy.request({
      method: METHOD.POST,
      url: `${urlBlipAi }${ENDPOINTS.COMMANDS}`,
      headers: headersWallet,
      body: {
        "id": guid,
        "to": toPostMasterBilling,
        "method": METHOD.SET,
        "uri": `${ENDPOINTS.WALLETS}/${Cypress.env('wallet')}/transactions`,
        "type": typeTransaction,
        "resource": {
          "description": "Debit 1.50",
          "type": "debit",
          "value": 1.50
        }
      }
    }).then(response => {
      expect(response).property('status').to.equal(200),
        expect(response.body).to.not.be.empty,
        expect(response.body).to.have.keys('type', 'resource', 'method', 'status', 'id', 'from', 'to', 'metadata'),
        expect(response).property('body').to.contain({
          "status": "success",
          "type": typeTransaction
        }),
        expect(response.body.resource).to.not.be.empty,
        expect(response.body.resource).to.have.keys('ownerIdentity', 'id', 'date', 'walletId', 'description', 'type', 'value'),
        expect(response).property('body').property('resource').to.contain({
          "walletId": decodeURIComponent(`${Cypress.env('wallet')}`),
          "type": "debit",
          "description": "Debit 1.50",
          "value": 1.50,
        })
    })
  })
})