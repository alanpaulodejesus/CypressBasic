/// <reference types="cypress" />
import { guid, toPostMasterBilling, urlBlipAi, typeTransaction, typecollection } from '../../fixtures/dataApi/factory/dataUtils';
import * as METHOD from '../../fixtures/dataApi/method.json';
import * as ENDPOINTS from '../../fixtures/dataApi/endpoints.json';
import { headersWallet } from '../../fixtures/dataApi/headers';

context('Get Wallet Transaction', () => {
  it('Get a Wallet Transaction', () => {
    cy.request({
      method: METHOD.POST,
      url: `${urlBlipAi }${ENDPOINTS.COMMANDS}`,
      headers: headersWallet,
      body: {
        "id": guid,
        "to": toPostMasterBilling,
        "method": METHOD.GET,
        "uri": `${ENDPOINTS.WALLETS}/${Cypress.env('wallet')}/transactions`
      }
    }).then(response => {

      expect(response).property('status').to.equal(200),
        expect(response.body).to.not.be.empty,
        expect(response.body).to.have.keys('type', 'resource', 'method', 'status', 'id', 'from', 'to', 'metadata'),
        expect(response).property('body').to.contain({
          "status": "success",
          "type": typecollection
        }),

        expect(response.body.resource).to.not.be.empty,
        expect(response.body.resource).to.have.keys('total', 'itemType', 'items'),
        expect(response.body.resource.items[0]).to.have.keys('ownerIdentity', 'id', 'date', 'walletId', 'description', 'type', 'productId', 'value', 'extras'),
        expect(response.body.resource.items[0]).to.contain({
          "walletId": decodeURIComponent(`${Cypress.env('wallet')}`)
        }),
        expect(response.body).property('resource').to.contain({
          "itemType": typeTransaction
        })
    })
  })
})