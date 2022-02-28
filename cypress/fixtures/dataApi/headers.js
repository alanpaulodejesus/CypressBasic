export const billing = {
    'Accept': 'application/json',
    'Authorization': `${Cypress.env('authorizationBilling')}`
    }

  export const headerAdmin = {
     'Content-Type': 'application/json',
      'Authorization': `${Cypress.env('authorizationAdmin')}`
  }

  export const headersWallet = {
    'accept': 'application/json',
    'Authorization': `${Cypress.env('authorizationWallet')}`
  }