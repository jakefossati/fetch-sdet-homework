describe('find the fake gold',{ testIsolation: false }, () => {
    before(() => {
        cy.visit('http://sdetchallenge.fetch.com/')
    })
    const groupSize = 3;
    const coins = [0,1,2,3,4,5,6,7,8];
    let phonyIndex = 0;
    const correctCoin = "Yay! You find it!";
    const incorrectCoin = "Oops! Try Again!";
    const url = "http://sdetchallenge.fetch.com/";
    let weighings = [];
    it('Ensure Page Loads', () => {
        cy.url().should("contain", url)
        cy.get('.game-board').should('contain.text', "left")
    })

    it('Add first set of numbers to left grid', () => {
        for (let i=0; i<groupSize; i++){
            cy.enterNumberLeftGrid(i,i);
            cy.checkGridNumber("left", i)
        }
    })

    it('Add numbers to right grid', () => {
        for (let i=coins.length-1; i>=(coins.length-groupSize); i--){
            cy.enterNumberRightGrid(i,i);
            cy.checkGridNumber("right", i);
        }
    })
    
    it('Test Weigh Button', () => {
        cy.clickWeighButton();
        cy.getWeighings().should("contain", '[');
    })

    it('Find which set has the phony', () => {
        cy.get('.game-info li').then(($w) => {
            if ($w.text().includes('<')){
                phonyIndex = 0;
            } else if ($w.text().includes('>')){
                phonyIndex = 6;
            } else {
                phonyIndex = 3;
            }
        })
    })

    it('Reset findings', () => {
        cy.clickResetButton();
        cy.get('#left_0').should("not.contain", "0");
    })

    it('Check Smaller Set', () => {
        cy.enterNumberLeftGrid(phonyIndex, 0);
        cy.enterNumberRightGrid(phonyIndex+1, 0);
        cy.clickWeighButton();
        cy.wait(2000); //this is bad
        cy.getWeighings().children().should("have.length", 2);
        cy.get('.game-info li').last().then(($w) => {
            if ($w.text().includes('<')){
                phonyIndex += 0;
            } else if ($w.text().includes('>')){
                phonyIndex += 1;
            } else {
                phonyIndex += 2;
            }
        })
    })

    it('Click phony, validate alert', () => {
        cy.clickCoinButton(phonyIndex);
        cy.on('window:alert', (text) => {
            expect(text).to.contain(correctCoin)
        })
        console.log(correctCoin);
        cy.log(correctCoin);
    })

    it('Click good coin, validate alert', () => {
        if (phonyIndex != 8){
            cy.clickCoinButton(phonyIndex+1);
        } else {
            cy.clickCoinButton(phonyIndex-1);
        }
        cy.on('window:alert', (text) => {
            expect(text).to.contain(incorrectCoin)
          })
    })

    it('Collect and output weighings', () => {
        cy.get('.game-info li')
          .each(($li) => weighings.push($li.text()))
          .then(() => {
            cy.log("Weighings: ")
            cy.log(weighings.join(',\n'))
            console.log(weighings.join(',\n'));
          })
        cy.log("Phony Coin: " + phonyIndex)
        console.log("Phony Coin: " + phonyIndex)
    })
})