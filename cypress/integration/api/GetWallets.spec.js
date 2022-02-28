/// <reference types="cypress" />
import { toPostMasterBilling, urlBlipAi, guid, typeWallet, typecollection } from '../../fixtures/dataApi/factory/dataUtils';
import * as DATA from '../../fixtures/dataApi/factory/dataUtils';
import * as METHOD from '../../fixtures/dataApi/method.json';
import * as ENDPOINTS from '../../fixtures/dataApi/endpoints.json';
import { headersWallet } from '../../fixtures/dataApi/headers';

const UUID = DATA.guid

context('Get Wallets', () => {
  it('Get a Wallet', () => {
    cy.request({
      method: METHOD.POST,
      url: `${DATA.urlBlipAi }${ENDPOINTS.COMMANDS}`,
      headers: headersWallet,
      body: {
        "id": UUID,
        "to": DATA.toPostMasterBilling,
        "method": METHOD.GET,
        "uri": `${ENDPOINTS.WALLETS}/${Cypress.env('wallet')}`
      }
    }).then(response => {
      expect(response).property('status').to.equal(200),
        expect(response.body).to.not.be.empty,
        expect(response.body).to.have.keys('type', 'resource', 'method', 'status', 'id', 'from', 'to', 'metadata'),
        expect(response).property('body').to.contain({
          "status": "success",
          "type": typeWallet
        }),
        expect(response.body.resource).to.not.be.empty,
        expect(response.body.resource).to.have.keys('id', 'balance', 'lastChange')
    })
  })

})