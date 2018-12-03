import { AttrObj } from './interfaces';

export abstract class BaseComponent {
  titleSel = 'h1';
  titleLinkSel = '.content-header a';
  usageExSel = 'demo-top-section h2';
  usageExCodeSel = 'demo-top-section .prettyprint';
  abstract pageUrl: string;
  titleDefaultExample = 'Usage';

  navigateTo() {
    cy.visit(this.pageUrl);
  }

  scrollToMenu(subMenu: string) {
    cy.get('examples h3').contains(subMenu).scrollIntoView();
  }

  clickOnDemoMenu(subMenu: string) {
    cy.get('add-nav').contains('a', subMenu).click();
  }

  clickByText(parent: string, text: string) {
    cy.get(parent).contains(text).click();
  }

  dblClickByText(parent: string, text: string) {
    cy.get(parent).contains(text).dblclick();
  }

  isBtnTxtEqual(baseSelector: string, expectedBtnTxt: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).invoke('text')
      .should(btnTxt => expect(btnTxt).to.equal(expectedBtnTxt));
  }

  isLabelTxtEqual(baseSelector: string, expectedLabelTxt: string, labelIndex?: number) {
    cy.get(`${baseSelector} label`).eq(labelIndex ? labelIndex : 0).invoke('text')
      .should(labelTxt => expect(labelTxt).to.equal(expectedLabelTxt));
  }

  clickOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).click();
  }

  dblClickOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).dblclick();
  }

  clickOnInput(baseSelector: string, inputIndex?: number) {
    cy.get(`${ baseSelector } input`).eq(inputIndex ? inputIndex : 0).click();
  }

  dblClickOnInput(baseSelector: string, inputIndex?: number) {
    cy.get(`${ baseSelector } input`).eq(inputIndex ? inputIndex : 0).dblclick();
  }

  isInputHaveAttrs(baseSelector: string, attributes: AttrObj[]) {
    cy.get(`${baseSelector} input`)
      .then(input => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(input).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });
  }

  clearInputAndSendKeys(baseSelector: string, dataToSend: string) {
    cy.get(`${baseSelector} input`).clear().type(dataToSend);
  }

  isDemoContainsTxt(baseSelector: string, expectedTxt: string, expectedTxtOther?: string) {
    cy.get(`${baseSelector}`).invoke('text')
      .should(blockTxt => {
        expect(blockTxt).to.contains(expectedTxt);
        expect(blockTxt).to.contains(expectedTxtOther ? expectedTxtOther : expectedTxt);
      });
  }
}
