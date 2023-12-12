
import * as ENDPOINTS from '../../fixtures/dataApi/endpoints.json';
import * as DATA from '../../fixtures/dataApi/factory/dataUtils';
import * as ContractPanel from '../../support/page/contractPanel';
require('cypress-xpath')

context("Validate DAUs Metrics Front End", () => {
    beforeEach(() => {
      
      cy.loginWithSucess("****", "****");
      cy.visit("https://"+`${DATA.contractDau}`+".hmg.blip.ai"+`${ENDPOINTS.APPLICATION}`+`${ENDPOINTS.TENANT}`+`${ENDPOINTS.DAUS}`);
      
    });

    
    it("Validate DAUs Metrics", () => {
      const data = new Date();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const dateCurrent = ano+'-'+mes;
      
      cy.getMetrics(`${ENDPOINTS.TENANT}`+"s"+`/${DATA.contractDau}`+`${ENDPOINTS.DAUS}`+`${ENDPOINTS.DAUTOTALMONTH}`+dateCurrent).then(response=>{
        expect(response).property('status').to.equal(200)
        expect(response.body.resource).to.have.keys('plan','totalDailyActiveUsers', 'exceededDailyActiveUsers', 'startDateReference', 'endDateReference', 'planUsageRate')
        const totalDailyUsers = response.body.resource.totalDailyActiveUsers
        const exceededlDailyUsers = response.body.resource.exceededDailyActiveUsers
        expect(totalDailyUsers).to.eq(409025)
        expect(exceededlDailyUsers).to.eq(408525)
        
      })
      cy.getMetrics(`${ENDPOINTS.TENANT}`+"s"+`/${DATA.contractDau}`+`${ENDPOINTS.DAUS}`+`${ENDPOINTS.DAUMONTHLYBYBOT}`+dateCurrent+"&$take=5").then(response=>{
        expect(response).property('status').to.equal(200)
        expect(response.body.resource.items[0]).to.have.keys('total', 'botName', 'botIdentity')
        const totalPos1 = response.body.resource.items[0].total
        expect(totalPos1).to.eql(387337)
        const totalPos2 = response.body.resource.items[1].total
        expect(totalPos2).to.eql(7228)

        cy.wait(6000);
        cy.get('#blip-tenant')
        .its('0.contentDocument.body')
        .then(body => {
          cy.wrap(body).find('//*[@title="'+totalPos1+'"]')
        })
      })
      cy.getMetrics(`${ENDPOINTS.TENANT}`+"s"+`/${DATA.contractDau}`+`${ENDPOINTS.DAUS}`+`${ENDPOINTS.DAUDAILY}`+dateCurrent+"&$take=5").then(response=>{
        expect(response).property('status').to.equal(200)
        expect(response.body.resource.items[0]).to.have.keys('total', 'dateReference')
        const totalPosDay1 = response.body.resource.items[0].total
        expect(totalPosDay1).to.eql(13252)
      })
    });
  });
