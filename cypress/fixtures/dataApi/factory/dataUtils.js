const faker = require('faker-br');

export const guid = faker.random.uuid()
export const getNumber = faker.phone.phoneNumber()

export const urlBlipAi = `${Cypress.env('baseUrlBlipAi')}`
export const urlMsging = `${Cypress.env('baseUrlMsging')}`
export const urlMetrics = `${Cypress.env('baseUrlMetrics')}`
export const urlAccount = `${Cypress.env('baseUrlAccount')}`

export const contractDau="netflix";

export const toPostMasterBilling = "postmaster@billing.blip.ai"
export const walletId="6%2FREQyrrRxwd%2BfS1FySKdDoAwI8eAMifaWhyD%2Fa1qMQ%3D"//Encode

export const typeWallet = "application/vnd.iris.billing.wallet+json"
export const typeTransaction = "application/vnd.iris.billing.wallet-transaction+json"
export const typecollection = "application/vnd.lime.collection+json"
