/// <reference types="cypress" />

import * as DATA from '../fixtures/dataApi/factory/dataUtils';
import * as METHOD from '../fixtures/dataApi/method.json';
import * as ENDPOINTS from '../fixtures/dataApi/endpoints.json';
import * as HEADER from '../fixtures/dataApi/headers';

Cypress.Commands.add('getWallet', () => {

  cy.request({
    method: METHOD.POST,
    url: `${DATA.urlBlipAi}${ENDPOINTS.COMMANDS}`,
    headers: HEADER.headerAdmin,
    body: {
      "id": "teste",
      "to": DATA.toPostMasterBilling,
      "method": METHOD.GET,
      "uri": `${ENDPOINTS.WALLETS}/` + `${Cypress.env('walletId')}`
    }
  })
})

Cypress.Commands.add('getMetrics', (uri)=>{
  cy.request({
    method: METHOD.POST,
    //url: `${DATA.urlBlipAi}${ENDPOINTS.COMMANDS}`,
    url: "https://billing.hmg-http.blip.ai/commands",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Key YWRtaW46TVZkVm5iblNsYUVjbGpkUzhvRWs=",
    },
    body:{
      "id": "1",
      "to": DATA.toPostMasterBilling,
      "method": METHOD.GET,
      "uri": uri
    }
  })
})

Cypress.Commands.add('getWalletTransaction', (uuid) => {

  cy.request({
    method: METHOD.POST,
    url: `${DATA.urlBlipAi}${ENDPOINTS.COMMANDS}`,
    headers: HEADER.headerAdmin,
    body: {
      "id": uuid,
      "to": DATA.toPostMasterBilling,
      "method": METHOD.GET,
      "uri": `${ENDPOINTS.WALLETS}/` + `${Cypress.env('walletId')}` + `/transactions`,
    }
  })
})


Cypress.Commands.add('sendMessageWhatsApp', (uuid, toFaker) => {

  cy.request({
    method: METHOD.POST,
    url: `${DATA.urlMsging}${ENDPOINTS.MESSAGES}`,
    headers: HEADER.billing,
    body: {
      "id": uuid,
      "to": toFaker + "@wa.gw.msging.net",
      "type": "application/json",
      "content": {
        "type": "hsm",
        "hsm": {
          "namespace": "whatsapp:hsm:messaging:blip",
          "element_name": "Teste Automation",
          "language": {
            "policy": "deterministic",
            "code": "pt_BR"
          }
        }
      }
    }
  })
})

Cypress.Commands.add('loginWithSucess', (user, password) => {
  //cy.visit(`${Cypress.env('urlAccount')}`);
  cy.visit("https://hmg-account.blip.ai/");
  cy.get('#email').type(user);
  cy.get('#password').type(password);
  cy.get('#blip-login').click();
  
})