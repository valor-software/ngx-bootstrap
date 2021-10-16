import { BaseComponent } from './base.component';

export class CarouselPo extends BaseComponent {
  pageUrl = '#/carousel';
  pageTitle = 'Carousel';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/carousel';

  carouselClass = '.carousel';
  indicatorClass = '.carousel-indicators';
  itemClass = '.carousel-item';
  leftControl = '.icon-prev';
  rightControl = '.icon-next';

  exampleDemosArr = {
    basic: 'demo-carousel-basic',
    optionalCaptions: 'demo-carousel-captions',
    configuringDefaults: 'demo-carousel-config',
    dynamicSlides: 'demo-carousel-dynamic',
    pauseOnHover: 'demo-carousel-pause-on-hover',
    customContent: 'demo-carousel-custom-content',
    disableLooping: 'demo-carousel-disable-looping',
    disableIndicator: 'demo-carousel-disable-indicator',
    interval: 'demo-carousel-interval',
    slideChangedEvent: 'demo-carousel-slide-changed-event',
    accessibility: 'demo-accessibility'
  };

  isClickActivatedCarouselItem(baseSelector: string, itemIndex: number) {
    cy.get(`${baseSelector} ${this.carouselClass} ${this.indicatorClass} li `)
      .eq(itemIndex)
      .click({ force: true })
      .should('have.class', 'active');
  }

  isCarouselItemActive(baseSelector: string, itemIndex: number) {
    cy.get(`${baseSelector} ${this.carouselClass} ${this.indicatorClass} li `)
      .eq(itemIndex)
      .should('have.class', 'active');
  }

  clickOnCtrl(baseSelector: string, ctrlType: string) {
    cy.get(`${baseSelector} ${ctrlType === 'left' ? this.leftControl : this.rightControl}`).click();
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
    cy.get(`${baseSelector} ${this.indicatorClass} li`)
      .should('to.have.length', expectedCount);
  }

  isCardTxtEqual(baseSelector: string, expectedTxt: string) {
    cy.get(`${baseSelector} .card.card-block`).invoke('text')
      .should(blockTxt => expect(blockTxt).to.equal(expectedTxt));
  }

  hoverSlide(baseSelector: string, slideIndex: number) {
    cy.get(`${baseSelector} ${this.carouselClass} div`).eq(slideIndex).trigger('mouseenter');
  }

  mouseLeave(baseSelector: string) {
    cy.get(`${baseSelector} ${this.carouselClass}`).trigger('mouseleave');
  }

  isCarouselIndicatorDisabled(baseSelector: string, disabled: boolean) {
    cy.get(`${baseSelector} ${this.carouselClass}`)
      .should(disabled ? 'to.not.have.descendants' : 'to.have.descendants', this.indicatorClass)
      .and('to.have.descendants', this.itemClass);
  }
}
