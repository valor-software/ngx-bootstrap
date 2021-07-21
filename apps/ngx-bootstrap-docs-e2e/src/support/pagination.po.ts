import { BaseComponent } from './base.component';

export class PaginationPo extends BaseComponent {
  pageUrl = '#/pagination';
  pageTitle = 'Pagination';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/pagination';

  classActive = '.active';
  classPrevBtn = '[class*="prev"]';
  classNextBtn = '[class*="next"]';
  classFirstBtn = '.pagination-first';
  classLastBtn = '.pagination-last';
  classPaginationPage = '.pagination-page';

  exampleDemosArr = {
    basic: 'demo-pagination-basic',
    manualSwitchingPage: 'demo-pagination-manual-switching',
    pageChangedEvent: 'demo-pagination-page-changed-event',
    pagesCountChangedEvent: 'demo-pagination-pages-count-changed',
    boundaryLinks: 'demo-pagination-boundary-links',
    directionLinks: 'demo-pagination-direction-links',
    customLinksContent: 'demo-pagination-custom-links-content',
    disabled: 'demo-pagination-disabled',
    limits: 'demo-pagination-limit',
    centeringPageLink: 'demo-pagination-rotate',
    contentSwitching: 'demo-pagination-content-switching',
    pager: 'demo-pagination-pager'
  };

  isActivePositionEqual(baseSelector: string, positionNumber: string) {
    cy.get(`${baseSelector} ${this.classActive}`).invoke('text')
      .should(linkTxt => expect(linkTxt).to.equal(positionNumber));
  }

  isPagerDisabled(baseSelector: string, pagerName: string, disabled: boolean) {
    cy.get(`${baseSelector} ${this.getPagerSelector(pagerName)}`)
      .should(disabled ? 'to.have.class' : 'not.to.have.class', 'disabled').invoke('text');
  }

  isPagerExist(baseSelector: string, pagerName: string, existence: boolean) {
    cy.get(`${baseSelector}`)
      .should(existence ? 'to.have.descendants' : 'not.to.have.descendants', this.getPagerSelector(pagerName));
  }

  isPagerTxtEqual(baseSelector: string, pagerName: string, expectedTxt: string) {
    cy.get(`${baseSelector} ${this.getPagerSelector(pagerName)}`).invoke('text')
      .should(pagerTxt => expect(pagerTxt).to.equal(expectedTxt));
  }

  isPageActive(baseSelector: string, pageNumber: string, active: boolean) {
    cy.contains(`${baseSelector} li`, pageNumber)
      .should(active ? 'to.have.class' : 'not.to.have.class', this.classActive);
  }

  isPageTxtEqual(baseSelector: string, pageIndex: number, expectedText: string) {
    cy.get(`${baseSelector} li`).eq(pageIndex).invoke('text')
      .should(pageTxt => expect(pageTxt).to.equal(expectedText));
  }

  isPageDisabled(baseSelector: string, pageNumber: string, disabled: boolean) {
    cy.contains(`${baseSelector} li`, pageNumber)
      .should(disabled ? 'to.have.class' : 'not.to.have.class', 'disabled');
  }

  clickOnPage(baseSelector: string, pageNumber: string) {
    cy.contains(`${baseSelector} li`, pageNumber).click();
  }

  clickOnPager(baseSelector: string, pagerName: string) {
    cy.get(`${baseSelector} ${this.getPagerSelector(pagerName)}`).click();
  }

  clickOnPaginationBtn(baseSelector: string, btnName: string) {
    cy.contains(`${baseSelector} button`, btnName).click();
  }

  isPaginationLengthEqual(baseSelector: string, expectedLength: number) {
    cy.get(`${baseSelector} ${this.classPaginationPage}`).should('have.length', expectedLength);
  }

  isActivePageCentered(baseSelector: string, isCentered: boolean) {
    cy.get(`${baseSelector} ${this.classPaginationPage}`).as('pagination').its('length').then(paginationlength => {
      cy.get('@pagination').each((element, index) => {
        if (element.hasClass('active')) {
          isCentered ? expect(index + 1).to.equal(Math.round(paginationlength / 2)) :
            expect(index + 1).not.to.equal(Math.round(paginationlength / 2));
        }
      });
    });
  }

  isPaginationContentUpdated(baseSelector: string) {
    cy.get(`${baseSelector} ${this.classPaginationPage}`).each((element, index) => {
      if (element.hasClass('active')) {
        cy.get(`${baseSelector} .content-wrapper`).invoke('text').then(contentTxt => {
          let i = 0;
          for (; i < 10; i++) {
            expect(contentTxt).to.contain(`Content line ${(index + 1) * 10 - i}`);
          }
        });
      }
    });
  }

  isSeparatePagerDisabled(baseSelector: string, pagerName: string, disabled: boolean) {
    cy.get(`${baseSelector} pager li`).eq(pagerName === 'Next' ? 1 : 0)
      .should(disabled ? 'to.have.class' : 'not.to.have.class', 'disabled');
  }

  getPagerSelector(pagerName: string): string {
    let pagerSelector: string;
    switch (pagerName) {
      case 'Next':
        pagerSelector = this.classNextBtn;
        break;
      case 'Previous':
        pagerSelector = this.classPrevBtn;
        break;
      case 'First':
        pagerSelector = this.classFirstBtn;
        break;
      case 'Last':
        pagerSelector = this.classLastBtn;
        break;
      default:
        pagerSelector = '';
    }

    return pagerSelector;
  }
}
