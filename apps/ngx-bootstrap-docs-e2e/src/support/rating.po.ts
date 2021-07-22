import { BaseComponent } from './base.component';

export class RatingPo extends BaseComponent {
  pageUrl = '#/rating';
  pageTitle = 'Rating';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/rating';

  tagRating = 'rating';

  exampleDemosArr = {
    basic: 'demo-rating-basic',
    dynamic: 'demo-rating-dynamic',
    customIcons: 'demo-rating-custom',
    selectOnEnter: 'demo-select-on-enter'
  };

  isRatingVisible(baseSelector: string, ratingIndex = 0) {
    cy.get(`${baseSelector} ${this.tagRating}`)
      .eq(ratingIndex)
      .should('to.be.visible');
  }

  isRatingReadonly(baseSelector: string, readonly = false, ratingIndex = 0) {
    cy.get(`${baseSelector} ${this.tagRating}`)
      .eq(ratingIndex)
      .should(readonly ? 'not.to.be.enabled' : 'to.be.enabled');
  }

  isRatingMaxEqual(baseSelector: string, maxValue: number, ratingIndex = 0) {
    cy.get(`${baseSelector} ${this.tagRating}`)
      .eq(ratingIndex)
      .find('span')
      .should('to.have.attr', 'aria-valuemax', `${maxValue}`);
  }

  isRatingCurrentEqual(baseSelector: string, value: number, ratingIndex = 0) {
    cy.get(`${baseSelector} ${this.tagRating}`)
      .eq(ratingIndex)
      .find('span')
      .should('to.have.attr', 'aria-valuenow', `${value}`);
  }

  isPreviewExist(baseSelector: string, previewText: string, previewNumber?: number) {
    cy.get(`${baseSelector} .card .card-block`).eq(previewNumber ? previewNumber : 0).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(previewText));
  }

  addRatingMark(baseSelector: string, ratingIndex = 0, markToAdd: number) {
    cy.get(`${baseSelector} ${this.tagRating}`)
      .eq(ratingIndex)
      .find('.bs-rating-star')
      .eq(markToAdd - 1)
      .click();
  }

  mouseMoveToRatingIcon(baseSelector: string, markToMove: number) {
    this.mouseMove(`${baseSelector} .bs-rating-star`, markToMove - 1);
  }

  focusOnRating(baseSelector: string) {
    cy.get(`${baseSelector} ${this.tagRating}>span`)
      .click({ force: true });
  }

  pressKeyboardBtn(baseSelector: string, btnName: string) {
    cy.get(`${baseSelector} ${this.tagRating}>span`).type(`{${btnName}}`, { force: true });
  }
}
