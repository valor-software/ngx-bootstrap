import { BaseComponent } from './base.component';

export class CarouselPo extends BaseComponent {
  pageUrl = '/ngx-bootstrap/components/carousel';
  pageTitle = 'Carousel';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';

  carouselClass = '.carousel';
  indicatorClass = '.carousel-indicators';
  itemClass = '.carousel-item';
  leftControl = '.icon-prev';
  rightControl = '.icon-next';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-carousel-basic',
    optionalCaptions: 'tab[heading="Overview"] demo-carousel-captions',
    configuringDefaults: 'tab[heading="Overview"] demo-carousel-config',
    dynamicSlides: 'tab[heading="Overview"] demo-carousel-dynamic',
    dynamicSlidesControlBtns: 'tab[heading="Overview"] demo-carousel-dynamic > div',
    pauseOnHover: 'tab[heading="Overview"] demo-carousel-pause-on-hover',
    customContent: 'tab[heading="Overview"] demo-carousel-custom-content',
    disableLooping: 'tab[heading="Overview"] demo-carousel-disable-looping',
    disableIndicator: 'tab[heading="Overview"] demo-carousel-disable-indicator',
    controlBtnDisableIndicator: 'tab[heading="Overview"] demo-carousel-disable-indicator > div',
    interval: 'tab[heading="Overview"] demo-carousel-interval',
    slideChangedEvent: 'tab[heading="Overview"] demo-carousel-slide-changed-event',
    accessibility: 'tab[heading="Overview"] demo-accessibility'
  };

  isClickActivatedCarouselItem(baseSelector: string, itemIndex: number) {
    cy.get(`${baseSelector} ${this.carouselClass} ${this.indicatorClass} button `).eq(itemIndex)
      .click()
      .should('have.class', 'active');
  }

  isCarouselItemActive(baseSelector: string, itemIndex: number) {
    cy.get(`${baseSelector} ${this.carouselClass} ${this.indicatorClass} button `).eq(itemIndex)
      .should('have.class', 'active');
  }

  clickOnCtrl(baseSelector: string, ctrlType: string) {
    cy.get(`${baseSelector}`).first().find(`${ctrlType === 'left' ? this.leftControl : this.rightControl}`).click();
  }

  isCarouselHaveIndicatorsItemsCtrls(baseSelector: string) {
    cy.get(`${baseSelector} ${this.carouselClass}`)
      .should('to.have.descendants', this.indicatorClass)
      .and('to.have.descendants', this.itemClass)
      .and('to.have.descendants', this.leftControl)
      .and('to.have.descendants', this.rightControl);
  }

  isEachSlideHave(baseSelector: string, slideParams: string[]) {
    cy.get(`${baseSelector} ${this.carouselClass} slide `)
      .each(slide => {
        let i = 0;
        for (; i < slideParams.length; i++) {
          expect(slide).to.have.descendants(slideParams[i]);
        }});
  }

  isSlidesCountEqual(baseSelector: string, expectedCount: number) {
    cy.get(`${baseSelector} ${this.indicatorClass} button`)
      .should('to.have.length', expectedCount);
  }

  isCardTxtEqual(baseSelector: string, expectedTxt: string) {
    cy.get(`${baseSelector} .card.card-block`).invoke('text')
      .should(blockTxt => expect(blockTxt).to.equal(expectedTxt));
  }

  hoverSlide(baseSelector: string, slideIndex: number) {
    cy.get(`${baseSelector} ${this.carouselClass} div`).eq(slideIndex).trigger('mouseenter');
  }

  override mouseLeave(baseSelector: string) {
    cy.get(`${baseSelector} ${this.carouselClass}`).trigger('mouseleave');
  }

  isCarouselIndicatorDisabled(baseSelector: string, disabled: boolean) {
    cy.get(`${baseSelector} ${this.carouselClass}`)
      .should(disabled ? 'to.not.have.descendants' : 'to.have.descendants', this.indicatorClass)
      .and('to.have.descendants', this.itemClass);
  }
}
