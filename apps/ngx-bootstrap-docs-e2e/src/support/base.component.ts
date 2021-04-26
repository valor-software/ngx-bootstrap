import { AttrObj } from './interfaces';

export abstract class BaseComponent {
  titleSel = 'h1';
  titleLinkSel = '.content-header a';
  usageExSel = 'demo-top-section h2';
  usageExCodeSel = 'demo-top-section .prettyprint';
  abstract pageUrl: string;
  titleDefaultExample = 'Usage';

  navigateTo() {
    const bsVersionRoute = Cypress.env('bsVersion') ? `?_bsVersion=bs${Cypress.env('bsVersion')}` : '';
    cy.visit(`${ this.pageUrl }${bsVersionRoute}`);
  }

  scrollToMenu(subMenu: string) {
    cy.get('examples h3').contains(subMenu).scrollIntoView();
  }

  clickOnDemoMenu(subMenu: string) {
    cy.get('add-nav').contains('a', subMenu).click();
  }

  clickByText(baseSelector: string, text: string) {
    cy.get(baseSelector).contains(text).click();
  }

  dblClickByText(parent: string, text: string) {
    cy.get(parent).contains(text).dblclick();
  }

  isBtnTxtEqual(baseSelector: string, expectedBtnTxt: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).invoke('text')
      .should(btnTxt => expect(btnTxt.trim()).to.equal(expectedBtnTxt.trim()));
  }

  isBtnDisabled(baseSelector: string, disabled: boolean, buttonIndex = 0) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0)
      .should(disabled ? 'to.be.disabled' : 'not.to.be.disabled');
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

  hoverOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${baseSelector} button`).eq(buttonIndex ? buttonIndex : 0).trigger('mouseenter');
  }

  mouseLeave(baseSelector: string, buttonIndex?: number) {
    cy.get(`${baseSelector} button`).eq(buttonIndex ? buttonIndex : 0).trigger('mouseleave');
  }

  mouseMove(baseSelector: string, elementIndex?: number) {
    cy.get(baseSelector).eq(elementIndex ? elementIndex : 0).trigger('mouseenter');
  }

  mouseOver(baseSelector: string, elementIndex?: number) {
    cy.get(baseSelector).eq(elementIndex ? elementIndex : 0).trigger('mouseover');
  }

  isInputHaveAttrs(baseSelector: string, attributes: AttrObj[], inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex)
      .then(input => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(input).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });
  }

  isInputValueEqual(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).should('to.have.value', expectedTxt);
  }

  isInputValueContain(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).then(input => {
      expect(input.val()).to.contains(expectedTxt);
    });
  }

  clearInputAndSendKeys(baseSelector: string, dataToSend: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).clear().type(dataToSend);
  }

  clearInput(baseSelector: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).clear();
  }

  clickEnterOnInput(baseSelector: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).type('{enter}');
  }

  pressEsc() {
    cy.get(`body input`).type('{esc}', { force: true });
  }

  isDemoContainsTxt(baseSelector: string, expectedTxt: string, expectedTxtOther?: string) {
    cy.get(`${baseSelector}`).invoke('text')
      .should(blockTxt => {
        expect(blockTxt).to.contains(expectedTxt);
        expect(blockTxt).to.contains(expectedTxtOther ? expectedTxtOther : expectedTxt);
      });
  }

  isButtonExist(baseSelector: string, buttonName: string, buttonNumber?: number, exist = true) {
    if (exist === true) {
      cy.get(`${baseSelector} button`).eq(buttonNumber ? buttonNumber : 0).invoke('text')
        .should(btnTxt => expect(btnTxt.trim()).to.equal(buttonName.trim()));
    } else {
      cy.get(`${baseSelector} button`).contains(buttonName).should('not.exist');
    }
  }

  isSelectExist(baseSelector: string, selectText: string, selectNumber = 0) {
    cy.get(`${baseSelector} select`).eq(selectNumber).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(selectText));
  }

  selectOne(baseSelector: string, selectToChose: string, selectNumber = 0) {
    cy.get(`${baseSelector} select`).eq(selectNumber).select(selectToChose);
  }

  isPreviewExist(baseSelector: string, previewText: string, previewNumber?: number) {
    cy.get(`${baseSelector} .card.card-block`).eq(previewNumber ? previewNumber : 0).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(previewText));
  }

  isButtonDisabled(baseSelector: string, buttonIndex = 0, disabled = true) {
    cy.get(`${baseSelector} button`).eq(buttonIndex).should(disabled ? 'to.be.disabled' : 'not.to.be.disabled');
  }

  clickOutside(baseSelector: string) {
    cy.get(baseSelector).eq(0).trigger('click', { clientX: 100, clientY: 100 , force: true});
  }

  clickCheckbox(baseSelector: string, shouldBeChecked: boolean) {
    if (shouldBeChecked) {
      cy.get(`${baseSelector} input[type="checkbox"]`)
        .check();
    } else {
      cy.get(`${baseSelector} input[type="checkbox"]`)
        .uncheck();
    }
  }

  isPreviewHidden(baseSelector: string, previewNumber?: number) {
    if (!previewNumber) {
      cy.get(`${baseSelector} .card.card-block`).should('not.exist');
    } else {
      cy.get(`${baseSelector} .card.card-block`).eq(previewNumber).should('not.exist');
    }
  }

  isTemplateSrcContain(demoName: string, expectedTxt: string) {
    cy.get('examples h3')
      .contains(demoName)
      .parent()
      .find('tab[heading*="template"]')
      .invoke('text')
      .should('to.contains', expectedTxt);
  }

  isCodePreviewExist(baseSelector: string, previewText: string, exist = true, previewNumber?: number) {
    if (exist) {
      cy.get(`${baseSelector} .code-preview`).eq(previewNumber ? previewNumber : 0).invoke('text')
        .should(btnTxt => expect(btnTxt).to.contain(previewText));
    } else {
      cy.get(`${baseSelector} .code-preview`)
        .should('not.exist');
    }
  }

  isComponentSrcContain(demoName: string, expectedTxt: string) {
    cy.get('examples h3')
      .contains(demoName)
      .parent()
      .find('tab[heading*="component"]')
      .invoke('text')
      .should('to.contains', expectedTxt);
  }

  isElemTextContain(baseSelector: string, itemSel: string, expectedText: string, elementIndex = 0) {
    cy.get(baseSelector).find(itemSel).eq(elementIndex).invoke('text')
      .should('contain', expectedText);
  }

  isElementVisible(baseSelector: string, additionalSelector: string, elementIndex = 0) {
    cy.get(`${ baseSelector } ${additionalSelector}`).eq(elementIndex).should('be.visible');
  }

  isUrlExist(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  isElemHasCorrectUrl(elementSelector: string, expectedUrl: string) {
    cy.get(`${elementSelector} [href="${ expectedUrl }"]`)
      .should('have.attr', 'href')
      .and('to.equal', expectedUrl);
  }
}
