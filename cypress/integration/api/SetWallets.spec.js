/// <reference types="cypress" />
import { guid, toPostMasterBilling, urlBlipAi, typeWallet } from '../../fixtures/dataApi/factory/dataUtils';
import * as METHOD from '../../fixtures/dataApi/method.json';
import * as ENDPOINTS from '../../fixtures/dataApi/endpoints.json';
import { headersWallet } from '../../fixtures/dataApi/headers';

context('Set Wallets', () => {
  it('Set a Wallet', () => {
    cy.request({
      method: METHOD.POST,
      url: `${urlBlipAi }${ENDPOINTS.COMMANDS}`,
      headers: headersWallet,
      body: {
        "id": guid,
        "method": METHOD.SET,
        "to": toPostMasterBilling,
        "type": typeWallet,
        "uri": `${ENDPOINTS.WALLETS}`,
        "resource": {}
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
        expect(response.body.resource).to.have.keys('id', 'balance', 'lastChange'),
        expect(response.body).property('resource').to.contain({
          "balance": 0.0
        })
    })
  })
})